

export default function TranformDate(date) {
 
    const selectDate=new Date(date);
    const fullYear=selectDate.getFullYear();
    const fullmonth=(selectDate.getMonth()+ 1).toString().padStart(2,"0");
    const day=selectDate.getDate().toString().padStart(2,"0");
return `${fullYear}-${fullmonth}-${day}`;

}
