export function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  export async function fetchProductData() {
    const response = await fetch('tents.json');
    return response.json();
  }
  