import Swal, { SweetAlertIcon } from "sweetalert2";

// 기본 alert
const alert = (title: string, icon: SweetAlertIcon) => {
  return Swal.fire({
    title,
    icon,
  });
};

// 확인 및 취소 alert
const confirmAlert = async (
  title: string,
  icon: SweetAlertIcon,
  onConfirm: () => void
) => {
  return Swal.fire({
    title,
    icon,
    confirmButtonText: "OK",
    showCancelButton: true,
  }).then((res) => {
    if (res.isConfirmed) {
      onConfirm();
    }
  });
};

// n초뒤 함수 실행 alert
const timerAlert = (title: string, icon: SweetAlertIcon) => {
  Swal.fire({
    title,
    icon,
    showConfirmButton: false,
    // confirmButtonText: 'OK',
    timer: 1500,
    willClose: () => {},
  });
};

export { alert, confirmAlert, timerAlert };
