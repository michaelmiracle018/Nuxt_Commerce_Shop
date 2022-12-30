<template>
  <div>
    <div class="related_item_wrap">
      <h2>Related Products</h2>
      <div class="item_wrap">
        <div class="single_card_item">
          <div class="item_title">
            <h4>title</h4>
          </div>
          <div class="item_image">
            <!-- :to="`/Products/${item.id}`" -->
            <!-- <nuxt-link  class="card"> -->
            <img src="../assets/images/car30.jpg" alt="image" />
            <!-- </nuxt-link> -->
          </div>
          <div class="item_category">
            <h4><span>Category:</span> category</h4>
          </div>
          <div class="item_rating">
            <h6>
              rating:
              <span>3.5</span>
            </h6>
            <button>view more</button>
          </div>
          <div class="footer">
            <span>GhC 77</span>
            <button>Add To cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Category',

  beforeMount() {
  }
}
</script>

<style scoped>

.related_item_wrap {
  margin-top: 3rem;
}

.related_item_wrap h2 {
  margin-bottom: 1rem;
}

/* ITEM WRAP STYLES */
.item_wrap {
  height: 100vh;
  max-height: 300px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  cursor: hand;
  transform: 0.2s ease-in-out;
}

.single_card_item {
  margin-bottom: 1rem;
  width: 370px;
}

.single_card_item:hover {
  transform: translateY(-0.5%);
  box-shadow: 0 4rem 8rem rgba(0, 0, 0, 0.2);
}

/* Item Tile */

.item_title {
  background: rgba(158, 33, 64, 0.5);
  padding: 0.5rem;
}

.item_rating h6 {
  margin-left: 0.5rem;
}

.item_title h4 {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #000000;
  text-transform: capitalize;
}

/* Item Image */

.item_image {
  padding-bottom: 0.4rem;
}
.item_image img {
  width: 370px;
  height: 12rem;
}

/* Item Category */
.item_category {
  margin-left: 10px;
}

.item_category h4 {
  font-family: 'Montserrat';
  font-style: normal;
  font-size: 15px;
  font-weight: 500;

  line-height: 28px;
  color: #333;
}

.item_category h4 span {
  font-weight: 800;
  color: #000000;
}

/* Item Rating */
.item_rating {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

.item_rating button {
  width: 150px;
  background-color: transparent;
  border-radius: 5px;
  outline: none;
  border: none;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #000000;
}

/* Item Footer */

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(158, 33, 64, 0.1);
  padding: 0.5rem;
}

.footer button {
  width: 140px;
  height: 40px;
  background: #9e2140;
  border-radius: 5px;
  outline: none;
  border: none;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
}

/* END OF ITEM WRAP */
</style>
