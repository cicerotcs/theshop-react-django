# Generated by Django 4.1.1 on 2022-09-27 21:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0002_order_shippingaddress_review_orderitem"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to=""),
        ),
    ]