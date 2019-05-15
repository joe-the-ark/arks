from django.shortcuts import render

# Create your views here.
from .models import Result

def result(request, name, player, game_secret, inviter):

	ctx = {}
	ctx['results'] = Result.objects.filter(name=name, player=player, game_secret=game_secret, inviter=inviter)

	return render(request, 'result.html', ctx)