from django.contrib import admin
from .models import *


class DeclarationInline(admin.TabularInline):
    model = Declaration
    extra = 1


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'user_type', 'gov_id',
                    'gov_id_type', 'issuing_authority', 'country', 'is_active',
                    'is_staff', 'last_login')
    search_fields = ('email', 'gov_id', 'gov_id_type',
                     'issuing_authority', 'country')
    list_filter = ('user_type', 'gov_id_type', 'issuing_authority', 'country',
                   'is_active', 'is_staff')
    inlines = [DeclarationInline]


class DeclarationUserFilter(admin.SimpleListFilter):
    title = 'user'
    parameter_name = 'user'

    def lookups(self, request, model_admin):
        users = set([d.user for d in model_admin.model.objects.all()])
        return [(u.id, u.email) for u in users]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(user__id=self.value())
        return queryset


class DeclarationAdmin(admin.ModelAdmin):
    list_filter = (DeclarationUserFilter,)


admin.site.register(User, UserAdmin)
admin.site.register(Individual)
admin.site.register(LegalEntity)
admin.site.register(Declaration, DeclarationAdmin)
# admin.site.register(DeclarationComment)
admin.site.register(Agreement)
admin.site.register(Notification)
