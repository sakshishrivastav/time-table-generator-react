const splitArray = (array, size) => {
    let rowSize = parseInt(array.length/size)
    let result = [];
    for(let i=0; i<rowSize; i++){
        result.push(array.splice(0, size));
    }
    return result;
}

const generateSchedule = (info, subjects) => {
  
    const getSchedule = (size) =>{
        const slots = [];
        subjects.forEach(subject => {
            let remaining= +subject.hours;
            while (remaining) {
                if(remaining>size){
                    slots.push({name:subject.name, hours: size})
                    remaining = remaining - size;
                }else {
                    slots.push({name:subject.name, hours: remaining})
                    remaining = remaining - remaining;
                }
            }
            
        });
        return slots;
    }

    let needsChange = true;
    let adj = 0;
    let slots = [];
    const maxSize = info.totalHours/info.workingDays
    while(needsChange){
        const size = parseInt(maxSize/info.perDay)+adj;
        // console.log("Getting Called New size ",size);
        slots = getSchedule(size);
        if(slots.length<=info.perDay*info.workingDays){
            needsChange = false;
        }
        if(size+adj<maxSize){
            adj = adj+1;
        }else needsChange = false;
    }

    const rows = splitArray(slots, info.workingDays);
    if(rows.length<=info.workingDays)return rows;
    else return "Not Feasible to Calculate ! Please readjust and try again with different values - Hint: Try Changing Working Days or Number of Subjects"
  
};
export default generateSchedule;




