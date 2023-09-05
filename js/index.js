let serchText = 'iphone';
let startNumber = 0;
let endnumber = 9;
let totaldata = '';
const my_modal_4 = document.getElementById('my_modal_4');
const showALLbtn = document.getElementById('showALL');
const spiner = document.getElementById('spiner');
const custom_Modal = document.getElementById('custom_Modal');
const lotdata = async () => {
    Phone_Hunting.innerHTML = ` <div id="spiner" class="col-span-full flex justify-center "><span class="    loading  loading-spinner text-[#0D6EFD] loading-lg"></span></div>`;
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${serchText}`)
    const data = await res.json();
    const phones = data.data;
    display(phones)
}


const display = phones => {
    totaldata = phones;
    if (endnumber > totaldata.length) {
        showALLbtn.setAttribute('disabled', '');
    } else {
        if (showALLbtn.hasAttribute('disabled')) {
            showALLbtn.removeAttribute('disabled');
        }
    }

    if (phones) {
        if (document.getElementById('spiner')) {
            document.getElementById('spiner').remove();
        }
        for (let startNumber = 0; startNumber < endnumber; startNumber++) {
            Phone_Hunting.insertAdjacentHTML('beforeend',
                `        
         <div class="card shadow-[#0000007a] shadow-xl border-t-2"> 
        <figure class="px-10 pt-10">
             <img src="${phones[startNumber].image}" alt="Shoes"
                  class="w-[75%]" /> 
        </figure>
        <div class="card-body items-center text-center">
             <h2 class="card-title font-bold mt-7">${phones[startNumber].phone_name}</h2>
             <p class="text-lg">There are many variations of passages of available, but the majority have suffered</p>
             <h2 class="text-xl font-bold text-[#403F3F]">$999</h2>
             <div class="card-actions">
             <button onclick="Show_Details('${phones[startNumber].slug}')" class=" text-[16px] font-bold rounded-lg py-3 text-white px-6 bg-[#0D6EFD]">Show Details</button>
             </div>     
        </div> 
       </div> `)
        }
    } else {
        console.log('Not found Any data')
    }
}


const Search_phone = () => {
    startNumber = 0;
    endnumber = 9
    Phone_Hunting.innerHTML = ''
    const Search_phone_id = document.getElementById('Search_phone_input');
    serchText = Search_phone_id.value;
    console.count('iPhone Hunting:')
    lotdata();


}

const showALL = (tarelement) => {
    if (totaldata.length >= endnumber) {
        startNumber = endnumber;
        endnumber += 9;
        if (totaldata.length < endnumber) {
            endnumber = totaldata.length;
        } else {
            endnumber += 9;
        }
        display(totaldata);

        if (endnumber === totaldata.length) {
            tarelement.setAttribute('disabled', '');
        } else {
            if (tarelement.hasAttribute('disabled')) {
                tarelement.removeAttribute('disabled');
            }
        }

    }

}
Show_Details = (data) => {

    custom_Modal.classList.remove('hidden')
    custom_Modal.classList.add('block')
    const phonename = data;
    console.log(phonename);
    fetch(`https://openapi.programming-hero.com/api/phone/${phonename}`)
        .then(res => res.json())

        .then(data => {
            const dataElement = data.data;
            const mainFeatures = dataElement.mainFeatures;

            const conten = `
        <div class="img flex justify-center w-full"> 
        <img class="w-[60%]" src="${dataElement.image}" alt="">
         </div>   
          <div class="title mt-5">
        <h1 class="sab_title text-3xl leading-8 text-[#403F3F] font-bold">${dataElement.name}</h1>
        <p class="mt-5 text-lg">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <div class="fetures">
             <h1 class="text-xl mt-5 text-[#706F6F]"><strong class="text-[#403F3F]">Storage :</strong>${mainFeatures.storage}</h1>            
              <h1 class="text-xl mt-5 text-[#706F6F]"><strong class="text-[#403F3F]">DisplaySize :</strong> ${mainFeatures.displaySize}</h1>         
             <h1 class="text-xl mt-5 text-[#706F6F]"><strong class="text-[#403F3F]">ChipSet :</strong> ${mainFeatures.chipSet}</h1>         
             <h1 class="text-xl mt-5 text-[#706F6F]"><strong class="text-[#403F3F]">Memory :</strong> ${mainFeatures.memory}</h1>             
             <h1 class="text-xl mt-5 text-[#706F6F]"><strong class="text-[#403F3F]">Slug :</strong> ${dataElement.slug}</h1> <h1 class="text-xl mt-5 text-[#706F6F]"><strong class="text-[#403F3F]">Brand :</strong> ${dataElement.brand}</h1>
  
        </div>
   </div>  
   <div class="colos flex justify-end w-full items-end"> 
        <button onclick="closeModal(this)" id="closemodal"
         class="bg-red-500 font-bold text-white rounded-lg py-2 px-6">Close</button>
         
         </div>`

            document.getElementById('msg_content').innerHTML = conten;

        })



}

function closeModal() {
    custom_Modal.classList.add('hidden')
    custom_Modal.classList.remove('block')
}



lotdata();

// https://openapi.programming-hero.com/api/phone/$%7Bid%7D