let now_count = document.querySelector('.now');

function aa() {
  const a = document.querySelector('.file').files;
  const b = document.querySelector('.count');
  let size = 1024 * 1024 * 10;
  let p_size = a[0].size / size;
  p_size = p_size % 1 === 0 ? p_size : ++p_size - (p_size % 1);
  b.innerHTML = p_size;
  if (p_size !== 1) {
    async_contoller(4, 0, p_size, a[0]);
  } else {
    let data = new FormData();
    data.append('name', a[0].name);
    data.append('nums', 1);
    data.append('file', a[0]);
    data.append('current', 1);
    upload_data(data);
  }
}

let async_contoller = async (size, now, max, file) => {
  let async_task = [];
  let i = now;
  // eslint-disable-next-line no-param-reassign
  for (; now < max && now < i + size; now++) {
    async_task.push(slice_data(1024 * 1024 * 10, file, now, max));
  }
  if (now >= max) {
    let data = new FormData();
    data.append('name', file.name);
    data.append('nums', max);
    data.append('current', max);
    data.append('file', null);
    upload_data(data);
    return true;
  }
  Promise.all(async_task).then(
    setTimeout(() => {
      async_contoller(size, now, max, file);
    }, 2000),
  );
};

let slice_data = async (size, file, nums, p_size) => {
  let data = new FormData();
  data.append('name', file.name);
  data.append('nums', p_size);
  now_count.innerHTML = nums + 1;
  if (file.size - size * nums > size) {
    let a = file.slice(size * nums, size * (nums + 1));
    data.set('file', a);
    data.set('current', nums);
    await upload_data(data);
  } else {
    let a = file.slice(size * nums, file.size);
    data.set('file', a);
    data.set('current', nums);
    await upload_data(data);
  }
};

let upload_data = async (value) => {
  url = 'http://localhost:9080/api/test';
  await fetch(url, {
    method: 'post',
    mode: 'no-cors',
    cache: 'no-cache',
    referrerPolicy: 'unsafe-url',
    body: value,
  });
};
