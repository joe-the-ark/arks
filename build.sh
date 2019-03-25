cd /root/mountainwater

git fetch origin
git merge origin/master


cd /root/mountainwater/ark

python3 manage.py migrate --settings=ark.settings_test
python3 manage.py collectstatic --no-input --settings=ark.settings_test

supervisorctl restart ark

service nginx restart

