export const catchAsyncErrors = (theFunction)=> {
    return (req,res,next)=>{
        //Promise.resolve.apply(theFunction(req,res,next)).catch(next);
        Promise.resolve(theFunction(req,res,next)).catch(next);
    };
};