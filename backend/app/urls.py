#connect the urls with views

from django.urls import path
from . import views


urlpatterns = [
    path('login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    path('users', views.getAllUsers, name='all-users'),
    
    path('profile', views.getUser, name='user-profile'),
    path('profile/edit', views.updateUserProfile, name="edit-profile"),
    
    path('users/register', views.registerUser, name='register'),
    
    path('products/', views.getProducts, name='products'),
    path('products/<str:pk>', views.getProduct, name='product'),
    path('products/<str:pk>/reviews/', views.createProductReview, name="create-review"),
    
    path('checkout/payment', views.addOrder, name='order'),

    path('orders/<str:pk>', views.getOrderById, name="user-orders"),
    path('orders/myorders/', views.getMyOrders, name="my-orders"),

]