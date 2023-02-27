userSchema.pre('save',function(next){
   var user=this;

   if(user.isModified('password')){
      bcrypt.genSalt(salt,function(err,salt){
         if(err)return next(err);
         bcrypt.hash(user.password,salt,function(err,hash){
            if(err) return next(err);
            user.password=hash;
            next();
         })
      })
   }
   else{
       next();
   }
});