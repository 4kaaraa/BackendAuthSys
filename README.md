# BackendAuthSys
Simple Auth system (Login/Register/Keys/Dashboard)

} Status:
- http://localhost/api/information/status

} Support Clé:
Verification - http://localhost/api/information/key/check?keys= {keys} || http://localhost/api/information/key/check?keys=BLUE-MPEB-DV82-VD1R
Creation - http://localhost/api/information/key/create
Take -
Hwid - 
Verification - 

} Support Account:
Register - http://localhost/api/information/user/register?username=[username]&password=[password]&keys=[keys]
Login Username - http://localhost/api/information/user/ulogin?username=[username]&password=[password]
Delete Account - http://localhost/api/information/user/delete-user?username=[username]

} Api Fetcher:
Fetch All User - http://localhost/api/information/user/all
Fetch All Key - http://localhost/api/information/key/all
