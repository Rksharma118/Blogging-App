1. First step -> npm init -y
   npm i mongoose crypto ejs body-parser

2. Then controllers,middleware,models,routes,services,views naam ke folders create karo

3. views mai partails naam ka folder bano aurr usme head.ejs ,nav.ejs,footer.ejs,script.ejs files create karo

4. head.ejs main head wala part , nav.ejs mai navbar, footer.ejs mai footer and script.ejs mai saari script files   
   daalni hai

5. index.js file bnao aurr usme saare packages import karo as well as all required files

6. mongodb connect karo index.js mai 

7. models mai user.js file create karo, usme mongoose ka schema define karo aurr password ko salt karo using crypto (userschema pre)

8. routes mai user.js file bnao jo saari request handle karega like ->signin aurr signup

9. routes/user.js mai signin aurr signup ker liye get aurr post request banao

10. signup ke post req mai agar user already exist karta hai to "Email already exists " send karo else new user  
    create karna hai

11. Because humne password hash kar rakha to jab hum signin ki post req karenge tab hume ek mongoose virtual 
    function create karna padega jo hashed password aurr humare password ko compare karega.
    For that , create a mongoose virtual fn at models/user.js
               aurr uslo signin ke post req ke sath link kardo
 
12. Then npm i jsonwebtoken
    aurr services mai authentication.js naam ki file create karo

13. authentication.js mai secret save karenge (jo bhi hum chahe),
    then jsonwebtoken ke documentation ke according format use karlo aurr
    createTokenForUser(to create a new token for the user) aurr validateToken(to verify the toekn) two functions creat karlo 

14. models/user.js ke static ke matchPassword fn mai return user karte hai .
   In place of return user , we will return token    

15. Change matchPassword into matchPasswordAndGenerateToken (jaruri nhi hai karna , bass aaise hi)

16. router.post("/signin") mai try aurr catch use karo aurr jo body se email aurr password lega,  try mai    
    matchPasswordAndGenerateToken use karo aurr return res.cookie("token",token).redirect("/") i.e. cookie generate karo aurr homepage pe redirect kardo
    catch mai return signin karo aurr error : "Incorrect email or password" use karo
    ab nav.ejs mai if(locals.error) karo aurr locals.error return karo with bootstrap (bootstrap pe jaake error return with danger search karlo)

17. Ab hum yeh chahte hai ki jab user signin nhi hai o create account and sign in button show ho , aurr jab user 
    signed in hai to add blogs and radha kishan sharma(username) show ho to iske liye Steps(18-20)

18. Middleware mai auth.js create karo, aurr usme checkForAuthCookie name ka fn create karo (use documentation).

19. npm i cookie-parser and index.js mai app.use(cookieParser()) and app.use(checkForAuthCookie("token"))

20. nav,ejs mai if else condition lgao . if(locals.user) hai to add blogs and radha kishan sharma 
    else {
        create account (href="/user/signup") and sign in(href="/user/signin")
    } 

21. If user click on Logout then it gets logged out - iske liye router.get("/logout") create karo user.js(routes) 
    mai

22. jab bhi user logout kare to response mai clear cookie ho jaye aurr homepage mai redirect kar jaaye

23. Ab blog.js (models mai) create karo aurr usme mongoose import karo , schema bnao (title,description,body) 

24. views mai addBlog.ejs create karo , usme ek form bnao jisme title ,description , body and submit ho (form 
    action="/blog")

25. routes mai blog.js create karo aur index.js mai use import karo (const blogRoute=require(./routes/blog.js)  + 
     app.use("/blog",blogRoute))

26. nav.ejs mai Add Blogs mai href="/blog/add-new" karo

27. routes/blog.js mai router.post("/") send karni hogi

28. index.js mai Blog import karo aurr app.get("/") mai blogs:allBlogs karo

29. home.ejs mai forEach (blogs.forEach(blog=>{})) loop use karke card create karo jo title and button (read more) show karega , title mai <%=blog.title> ,description mai <%blog.desc%> aurr readmore mai href="/blog/<%=blogs._id%>

30. blog.js mai router.get("/:id) request daalo jo id li help se blog provide karwaye. 

31. views mai blog.ejs create karo jo jab hum read more par click akre tab render ho jaaye aurr hume complete blog 
     show ho jaaye

32. now add edit button and delete button in blog.ejs

33. create editblog.ejs in views 

34. In blog.js , add router.get("/:id/edit") and router.post("/:id/edit")
    get req mai blog find karega aurr editblog render karega
    post mai findByIdAndUpdate karega .

35. In blog.js add router.post("/:id/delete") , jo findByIdAbdDelete karega aurr home pe redirect ho jayega.

