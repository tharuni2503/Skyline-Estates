export const inr=(n:number)=>n>=10000000?`₹${(n/10000000).toFixed(2)} Cr`:n>=100000?`₹${(n/100000).toFixed(1)} L`:`₹${n.toLocaleString("en-IN")}`;
