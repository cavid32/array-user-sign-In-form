// butun idleri js e tanitdirmaq ve uzerinde islemek ucun hazirlamaq
const ad = document.getElementById("name");
const soyad = document.getElementById("surname");
const email = document.getElementById("email");
const telefon = document.getElementById("phone");
const yas = document.getElementById("age");
const parol = document.getElementById("password");
const parolun_tekrari = document.getElementById("repeat-password");
const yeniIstifadeciYaratBtn = document.getElementById("createNewUser");
const istifadeci_adi = document.getElementById("useremail");
const istifadeci_parolu = document.getElementById("userpassword");
const daxilOlBtn = document.getElementById("login");
const sign_form = document.getElementById("sign-form");
const account = document.getElementById("account");
const cari_parol = document.getElementById("current-password");
const yeni_parol = document.getElementById("new-password");
const yeni_parolun_tekrari = document.getElementById("new-repeat-password");
const sifreniYenileBtn = document.getElementById("updatePassword");
const cixisBtn = document.getElementById("logout");
const hesabiSilBtn = document.getElementById("delete-account");





const istifadeciYarat = () => {
    // movcud butun userleri userData adi ile local storage den almaq
  const userData = JSON.parse(localStorage.getItem("user"));

//   1. xanalar bos olarsa, boslugu bildirmek
  if (
    ad.value == "" ||
    soyad.value == "" ||
    email.value == "" ||
    telefon.value == "" ||
    yas.value == "" ||
    parol.value == "" ||
    parolun_tekrari.value == ""
  ) {
    alert("xanalari doldurun");
  } 
//   1. xanalar dolu olarsa is gormek
  else {
    // 2. xanalar dolu oldugu halda, parollarin eyni olmadigi halda gorulen is
    if (parol.value != parolun_tekrari.value) {
      alert("sifreler eyni deyil");
    } 
    // 2. xanalar dolu oldugu halda, parollarin eyni oldugu halda gorulen is
    else {
        // 3. xanalar dolu ve yazilan emailin qeydiiyyatda olub olmasmasini butun userData uzerinden email inputunn deyerini find ederek yoxlamaq
      let emailMovcudlugu = userData.find(
        (melumat) => melumat.email == email.value
      );
      // 3.1 email varsa bu uzre is gormek
      if (emailMovcudlugu) {
        alert("bu mail istifade olunur");
      } 
      // 3.1. email yoxdursa qeydiyyati tamamlamaq
      else {
        // local storageden aldigimiz ve melumatin icerisine yeni melumati elave etmek
        userData.push({
          ad: ad.value,
          soyad: soyad.value,
          email: email.value,
          telefon: telefon.value,
          yas: yas.value,
          parol: parol.value,
          parolunTekrari: parolun_tekrari.value,
        });
        // local storage e yeni melumati elave etmek
        localStorage.setItem("user", JSON.stringify(userData));
        // - 
        alert("Ugurla qeydiyyat tamamlandi");
        // xanalari sifirlamaq
        ad.value = "";
        soyad.value = "";
        email.value = "";
        telefon.value = "";
        yas.value = "";
        parol.value = "";
        parolun_tekrari.value = "";
      }
    }
  }
};

const hesabaGiris = () => {
    // butun qeydiyyatlari userData adi ile almaq
  const userData = JSON.parse(localStorage.getItem("user"));
  // 1. xanalarin bos olmasi hali
  if (istifadeci_adi.value == "" || istifadeci_parolu.value == "") {
    alert("xanalari doldurun");
  } 
  // 1. xanalarin dolu olmasi hali
  else {
    // 2. xanalar doludursa, userData icerisinden istifadeci_adi.value icersinde olan emailin olub olmadigini yoxlamaq 
    const tapilan = userData.find(
      (melumat) => melumat.email == istifadeci_adi.value
    );

    // 2. eger bele bir email varsa
    if (tapilan) {
        // 3. email oldugu ucun tapilan istifadecinin parolu inputla dogrulugunu yoxlamaq
      if (tapilan.parol == istifadeci_parolu.value) {
        sign_form.classList.add("d-none");
        account.classList.remove("d-none");
        // 4. giris ugurlu oldugu ucun giren sexsin sonradan kimliyini bilmeyimiz ucun gizli inputun deyeri olaraq menimsetmek
        document.getElementById("loggedEmail").value = tapilan.email;
      } 
        // 3. email oldugu ucun tapilan istifadecinin parolu inputla yanlislgini yoxlamaq
      else {
        account.classList.add("d-none");
        sign_form.classList.remove("d-none");
      }
    } 
    // 2. eger bele bir email yoxdursa
    else {
      account.classList.add("d-none");
      sign_form.classList.remove("d-none");
    }
  }
};


const hesabdanCixis = () => {
    // hesabdan cixdiqda ekrandaki divlerin klaslarinin deyismesi
  sign_form.classList.remove("d-none");
  account.classList.add("d-none");
};



const sifreniYenileFunk = () => {
    // 1. xanalar bos olmasi hali
  if (
    cari_parol.value == "" ||
    yeni_parol.value == "" ||
    yeni_parolun_tekrari.value == ""
  ) {
    alert("xanalari doldurun");
  } 
  // 1. xanalarin dolu olmasi hali
  else {
    // 2. butun userleri userData adi ile local storageden almaq
    let userData = JSON.parse(localStorage.getItem("user"));
    // 3. userData icerisinde loggedEmail.value icersinde yazilmis deyerin olub olmamasini yoxlamaq
    const tapilanIstifadeci = userData.find(
      (melumat) => melumat.email == loggedEmail.value
    );
    // 4. user tapilibsa is gormek
    if (tapilanIstifadeci) {
        // 5. tapilan userin hazirki parolunun dogrulugunu yoxlamaq
      if (tapilanIstifadeci.parol == cari_parol.value) {
        // 6. 5-ci hal odendikde, yeni parollarin eyniliyini yoxlamaq
        if (yeni_parol.value == yeni_parolun_tekrari.value) {
            // tapilan istifadecinin parol ve yeni parolunun deyerini deyismek
          tapilanIstifadeci.parol = yeni_parol.value;
          tapilanIstifadeci.parolunTekrari = yeni_parolun_tekrari.value;

          // 7. userData deyiseninin deyerini, hazirki user xaric butun userlere menimsetmek
          userData = userData.filter(
            (item) => item.email != tapilanIstifadeci.email
          );
          //8. userData icerisine yeni tapilan istifadecini gondermek
          userData.push(tapilanIstifadeci);
          // 9. local storageden movcud userleri silmek
          localStorage.removeItem("user");
          // 10. local sotage e yeniden yeni user list gondermek
          localStorage.setItem("user", JSON.stringify(userData));
        } 
        // 6. yeni parollarin sehv yazilisi
        else {
          alert("sifreler yanlisdir");
        }
      } 
      // 5. tapilan istifadeci var, ancaq cari parol sehvdir
      else {
        console.log("istifadeci tapildi ve cari parol sehvdir");
      }
    } 
    // 4. user tapilmayibsa is gormek
    else {
      console.log("tapmadi");
    }
  }
};

const hesabiSil = () => {
    // local storage de olan butun user key ile olan melumati cekmek
  let userData = JSON.parse(localStorage.getItem("user"));

  // userData-ya yeni deyer olaraq, loggedEmail inputunun deyeri xaric butun userleri menimsetmek
  userData = userData.filter((melumat) => melumat.email != loggedEmail.value);
  // local storageden user adli melumati silmek
  localStorage.removeItem("user");

  // local storage e yenilenmis user melumati gondermek
  localStorage.setItem("user", JSON.stringify(userData));
};







// buttonlara klik etdikde isleyecek funksiyalari bildirmek
hesabiSilBtn.addEventListener("click", hesabiSil);
sifreniYenileBtn.addEventListener("click", sifreniYenileFunk);
cixisBtn.addEventListener("click", hesabdanCixis);
daxilOlBtn.addEventListener("click", hesabaGiris);
yeniIstifadeciYaratBtn.addEventListener("click", istifadeciYarat);
