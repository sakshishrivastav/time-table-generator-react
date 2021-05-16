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
        }
    }

    const rows = splitArray(slots, info.workingDays);
    return rows;
  
};
export default generateSchedule;



