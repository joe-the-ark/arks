cd /root/ark

git fetch origin
git merge origin/master


cd /root/ark/ark

python3 manage.py migrate --settings=ark.settings_test
# python3 manage.py collectstatic --no-input --settings=moutainearth.settings_test

supervisorctl restart ark

service nginx restart

