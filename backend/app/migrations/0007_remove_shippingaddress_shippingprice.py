# Generated by Django 4.1.1 on 2022-10-04 04:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0006_alter_order_user"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="shippingaddress",
            name="shippingPrice",
        ),
    ]
