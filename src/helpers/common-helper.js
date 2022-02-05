import dayjs from 'dayjs';

export function remove(el) {
  document.getElementById(el).style.display = 'none';
}

export function sortRawProducts(data, sortBy) {
  const sorted = data.sort((a, b) => {
    const atime = new Date(a.productCreatedDate).getTime();
    const btime = new Date(b.productCreatedDate).getTime();
    let val = 0;
    if (sortBy === 'newest') {
      val = atime - btime;
    } else {
      val = btime - atime;
    }
    return val;
  });
  return sorted;
}

export function getTimeRemainingFromNow(endDate) {
  const diff = dayjs(endDate).diff(dayjs());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function setSelected() {
  const paymentContainer = document.querySelector('.el-radio-group');
  const selectedMethod = paymentContainer.querySelector('.el-radio-button__original-radio:checked+.el-radio-button__inner');
  selectedMethod.classList.add('selected-method');
}

export function formatDate(date) {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }

  return [year, month, day].join('/');
}
