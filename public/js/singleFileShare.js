const dropZone = document.querySelector(".drop-zone");
const fileInput = document.querySelector("#fileInput");
const browseBtn = document.querySelector("#browseBtn");

const bgProgress = document.querySelector(".bg-progress");
const progressPercent = document.querySelector("#progressPercent");
const progressBar = document.querySelector(".progress-bar");
const progressContainer = document.querySelector(".progress-container");
const status = document.querySelector(".status");

const uploadContainer = document.querySelector(".upload-container");
const sharingContainer = document.querySelector(".sharing-container");
const extraSharingContainer = document.querySelector(
  ".extra-sharing-container"
);
const copyURLBtn = document.querySelector("#copyURLBtn");
const fileURL = document.querySelector("#fileURL");
const emailForm = document.querySelector("#emailForm");

const toast = document.querySelector(".toast");

const host = "http://localhost:3000";
const uploadURL = `${host}/api/files`;
const emailURL = `${host}/api/files/send`;

const maxAllowedSize = 100 * 1024 * 1024; //100mb

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  if (!dropZone.classList.contains("dragged")) {
    dropZone.classList.add("dragged");
  }
});

dropZone.addEventListener("dragleave", (e) => {
  dropZone.classList.remove("dragged");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  if (files.length == 1) {
    if (files[0].size < maxAllowedSize) {
      fileInput.files = files;
      uploadFile();
    } else {
      showToast("Max file size is 100MB");
    }
  } else if (files.length > 1) {
    showToast("You can't upload multiple files");
  }
  dropZone.classList.remove("dragged");
});

browseBtn.addEventListener("click", () => {
  fileInput.click();
});

// sharing container listenrs
copyURLBtn.addEventListener("click", () => {
  fileURL.select();
  document.execCommand("copy");
  showToast("Link copied to clipboard");
});

// file input change and uploader
fileInput.addEventListener("change", () => {
  uploadFile();
});

const uploadFile = () => {
  if (fileInput.files.length > 1) {
    showToast("Only upload 1 file!!!");
    resetFileInput();
    return;
  }
  const file = fileInput.files[0];
  if (file.size > maxAllowedSize) {
    showToast("Max file size is 100MB");
    resetFileInput();
    return;
  }

  //show the uploader
  progressContainer.style.display = "block";

  const formData = new FormData();
  formData.append("myfile", file);

  // upload file
  const xhr = new XMLHttpRequest();

  // listen for upload progress
  xhr.upload.onprogress = updateProgress;

  // handle error
  xhr.upload.onerror = function () {
    resetFileInput();
    showToast(`Error in upload: ${xhr.statusText}.`);
  };

  // listen for response which will give the link
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      // onFileUploadSuccess(xhr.responseText);
      onUploadSuccess(JSON.parse(xhr.response));
    }
  };

  xhr.open("POST", uploadURL);
  xhr.send(formData);
};

const updateProgress = (e) => {
  // find the percentage of uploaded
  const percent = Math.round((e.loaded / e.total) * 100);
  bgProgress.style.width = `${percent}%`;
  progressPercent.innerText = percent;
  const scaleX = `scaleX(${percent / 100})`;
  progressBar.style.transform = `scaleX(${percent / 100})`;
};

const onUploadSuccess = ({ file: url }) => {
  resetFileInput();
  emailForm[2].removeAttribute("disabled");
  progressContainer.style.display = "none";
  sharingContainer.style.display = "block";
  extraSharingContainer.style.display = "flex";
  uploadContainer.style.marginLeft = 30 + "px";
  uploadContainer.style.marginTop = 30 + "px";
  document.querySelector(".image-vector").style.marginLeft = 30 + "px";
  // document.querySelector(".image-vector").src = "../img/undraw_share_link.svg"
  fileURL.value = url;
  const fileURLExt =
    "http://localhost:3000/files/" + fileURL.value.split("/").splice(-1, 1)[0];
  $("#share").jsSocials({
    url: fileURLExt,
    text: "File sent via FileShare ",
    showLabel: false,
    shares: ["whatsapp", "twitter", "facebook"],
  });
  generateQR(fileURL.value);
};

const resetFileInput = () => {
  fileInput.value = "";
  resetQR();
};

emailForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = fileURL.value;
  const formData = {
    uuid: url.split("/").splice(-1, 1)[0],
    emailTo: emailForm.elements["to-email"].value,
    emailFrom: emailForm.elements["from-email"].value,
  };
  emailForm[2].setAttribute("disabled", "true");
  console.table(formData);
  fetch(emailURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        sharingContainer.style.display = "none";
        extraSharingContainer.style.display = "none";
        showToast("Email Sent");
      }
    });
});

// the toast function
let toastTimer;
const showToast = (msg) => {
  toast.innerText = msg;
  toast.style.display = "block";
  toast.style.transform = "translate(-50%,0)";

  clearTimeout(toastTimer);
  toast.classList.add("show");

  toastTimer = setTimeout(() => {
    // toast.style.transform = "translate(50%,60px)"
    toast.classList.remove("show");
    toast.innerText = "";
    toast.style.display = "none";
  }, 2000);
};

//QR-Code generator
const qrCodeContainer = document.querySelector(".qr-code-container");
qrImg = qrCodeContainer.querySelector(".qr-code img");
console.log(qrCodeContainer);
console.log(qrImg);
let preValue;

const generateQR = (value) => {
  let qrValue = value.trim();
  if (!qrValue || preValue === qrValue) return;
  preValue = qrValue;
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
  qrImg.addEventListener("load", () => {
    qrCodeContainer.classList.add("active");
  });
};

const resetQR = () => {
  qrCodeContainer.classList.remove("active");
  preValue = "";
  qrImg.src = "";
};
