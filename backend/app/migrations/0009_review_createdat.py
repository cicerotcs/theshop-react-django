# Generated by Django 4.1.1 on 2022-10-07 04:39

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0008_rename_user_order_email_order_name"),
    ]

    operations = [
        migrations.AddField(
            model_name="review",
            name="createdAt",
            field=models.DateTimeField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
    ]