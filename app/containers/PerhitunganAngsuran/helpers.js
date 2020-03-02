export const calc_installment = (plafon, margin, tenor) => {
    return (plafon + plafon*margin/100) / tenor; 
}

export const check_max_installment = (maxInstallment,plafon,margin,tenor) => {
    let angsuran = (plafon + plafon*margin/100)/tenor;
    if(angsuran > maxInstallment){
        return true
    } else {
        // console.log(angsuran);
        // console.log(maxInstallment);
        return false;
    }
}

export const calc_acceptable_installment = pendapatan => 30/100*parseInt(pendapatan);