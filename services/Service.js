import axios from 'axios';

const loadArticles = (cancelTokenSource) => {
  return axios.get('https://formcarry.com/', {
    cancelToken: cancelTokenSource.token
  })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error(error);
    throw new Error('Ошибка загрузки статей');
  });
}

export { loadArticles };
