#! /bin/bash
echo > form.json
node src/fillForm.js << EOF > /dev/null
sakshi
1234-12-12
hi,bye
mh
india
EOF

echo -n '{"name":"sakshi","dob":"1234-12-12","hobbies":["hi","bye"],"address":"mh\nindia"}' > testFile.json

diff testFile.json form.json

rm testFile.json


