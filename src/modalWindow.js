import Swal from 'sweetalert2';

export default async function showModal() {
  const modal = await Swal.fire({
    title: 'Choose a cross or a zero',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'X',
    cancelButtonText: 'O',
  });
  const querry = modal.value === true ? 'cross' : 'circle';
  fetch(process.env.SERVER_URL, {
    method: 'POST',
    body: querry,
  });
}
