import client from './client';

const endpoint = '/listings';

const getListings = () =>
  client.get('https://api.punkapi.com/v2/beers?page=1&per_page=20');

export const addListing = (listing, onUploadProgress) => {
  const data = new FormData();
  data.append('title', listing.title);
  data.append('price', listing.price);
  data.append('categoryId', listing.category.value);
  data.append('description', listing.description);

  listing.images.forEach((image, index) =>
    data.append('images', {
      name: 'image' + index,
      type: 'image/jpeg',
      uri: image,
    }),
  );

  if (listing.location) {
    data.append('location', JSON.stringify(listing.location));
  }

  return client.post(endpoint, data, {
    onUploadProgress: progress =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addListing,
  getListings,
};
