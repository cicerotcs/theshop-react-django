# Generated by Django 4.1.1 on 2022-10-04 00:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0004_alter_product_price"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="order",
            name="taxPrice",
        ),
        migrations.AddField(
            model_name="shippingaddress",
            name="phone",
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name="shippingaddress",
            name="state",
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name="shippingaddress",
            name="unit",
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
