from ast import Or
from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import Product, Order, ShippingAddress, OrderItem, Review
from django.contrib.auth.models import User

from .serializer import ProductSerializer, ShippingAddressSerializer, UserSerializer, UserSerializerWithToken, OrderSerializer, ReviewSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from django.contrib.auth.hashers import make_password
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from datetime import datetime


# PRODUCT VIEWS

@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    
    if query == None:
        query = ''
    
    products = Product.objects.filter(title__icontains=query)
    
    #currentPage = request.query_params.get('page')
    page = request.GET.get('page', 1)
    paginator = Paginator(products, 8)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
    

    serializer = ProductSerializer(products, many=True)
    return Response({'products':serializer.data, 'page': page, 'pages': paginator.num_pages})

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

# @api_view(['GET'])
# def getProduct(request, pk):
#     product = None
#     for i in products:
#         if i['_id'] == pk:
#             product = i
#             break
#     return Response(product)

# @api_view(['GET'])
# def getProducts(request):
#     return Response(products) 

# USER VIEWS

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
     def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
         
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUser(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message={'email already registered'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    
    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)

# ORDER VIEWS

@api_view(['POST'])
def addOrder(request):

    data = request.data

    cart = data['cart']

    order = Order.objects.create(
        email = data['email'],
        name = data['name'],
        paymentMethod = data['paymentMethod'],
        shippingPrice = data['shippingPrice'],
        totalPrice = data['totalPrice']
    )

    shipping = ShippingAddress.objects.create(
        order = order,
        address = data['address'],
        unit = data['unit'],
        city = data['city'],
        state = data['state'],
        postalCode = data['postalCode'],
        country = data['country'],
        phone = data['phone'],
    )

    for i in cart:
        product = Product.objects.get(_id=i['_id'])

        item = OrderItem.objects.create(
            product=product,
            order=order,
            name=product.title,
            qty=i['qty'],
            price=i['price'],
            image=product.image.url,
        )

        product.countInStock -= item.qty
        product.save()

    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)

@api_view(['PUT','GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user
    order = Order.objects.get(_id=pk)

    if(order.email == user.email):
        serializer = OrderSerializer(order, many=False)
        order.isPaid = True
        order.paidAt = datetime.now()
        order.save()
        return Response(serializer.data)
    else:
        return Response({'Not authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)

    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = Order.objects.all()

    ordersSerialized = OrderSerializer(orders, many=True)
    userOrders = []

    if len(ordersSerialized.data) > 0:
        for i in ordersSerialized.data:
            if user.email == i['email']:
                userOrders.append(i)
    
    return Response(userOrders)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # 1 - Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            title=data['title'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        serializer = ReviewSerializer(review, many=False)

        return Response(serializer.data)
        




