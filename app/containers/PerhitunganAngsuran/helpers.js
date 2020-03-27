export const calc_installment = (plafon, margin, tenor) => {

    let tahun_tenor = tenor/12;
    let tmargin = (plafon+plafon*margin/100)*tahun_tenor;
    let npokok = plafon/tenor;
    let nmargin = tmargin/tenor;
    let angsuran = npokok + nmargin;
    // console.log(angsuran);
    return angsuran;
    //return (plafon + plafon*margin/100) / tenor; 
}

export const check_max_installment = (maxInstallment,plafon,margin,tenor) => {
    let tahun_tenor = tenor/12;
    let tmargin = (plafon+plafon*margin/100)*tahun_tenor;
    let npokok = plafon/tenor;
    let nmargin = tmargin/tenor;
    let angsuran = npokok + nmargin;
    // let angsuran = (plafon + plafon*margin/100)/tenor;
    if(angsuran > maxInstallment){
        console.log('angsuran lebih dari DSR');
        console.log(maxInstallment);
        return true;
    } else {
        console.log('angsuran bisa diambil tdk lebih dari DSR ');
        console.log(maxInstallment);
        return false;
    }
}

// ini bisa disebut juga DSR
export const calc_acceptable_installment = pendapatan => 30/100*parseInt(pendapatan);