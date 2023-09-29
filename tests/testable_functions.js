const aggregateRatings = (ratingBarStub, allReviews) => {
    return ratingBarStub.map((item, idx) => {
      const averageRating = allReviews.reduce((total, curReview) => {
        return total + curReview.ratings[idx].value;
      }, 0) / allReviews.length;
      item.percent = averageRating * 20;
      return item;
  });
}
console.log(aggregateRatings([{'label': 'Student Life'}, {'label': 'Liked It'}, {'label': 'Difficulty'}, {'label': 'Preparedness'}],[{'postType': 'anon', 'review': 'really really  really really really  really really really  really good!', 'ratings': [{'label': 'Student Life', 'value': 2}, {'label': 'Liked it', 'value': 4}, {'value': 4, 'label': 'Difficulty'}, {'value': 1, 'label': 'Preparedness'}]}, {'postType': 'known', 'review': "SYDE '22 here! Absolutely loved this program - the academics, student life and professional opportunities made my experience special. Would definitely recommend to any ambitious, analytical and intellectually curious high school student. ", 'ratings': [{'label': 'Student Life', 'value': 5}, {'label': 'Liked it', 'value': 5}, {'label': 'Difficulty', 'value': 3}, {'value': 5, 'label': 'Preparedness'}]}]))