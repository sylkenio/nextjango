from django.http import JsonResponse


def index(_request):
    return JsonResponse({"status": "ok"})

def health(_request):
    return JsonResponse({"status": "ok"})
