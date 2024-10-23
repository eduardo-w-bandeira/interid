from django.contrib import admin
from .models import User, Individual, LegalEntity, Declaration, Agreement, AgreementParticipant


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'user_type', 'gov_id',
                    'gov_id_type', 'issuing_authority', 'country')


admin.site.register(User, UserAdmin)
# admin.site.register(User)
admin.site.register(Individual)
admin.site.register(LegalEntity)
