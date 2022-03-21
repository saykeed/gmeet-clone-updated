import { ref } from 'vue'


let getBlog = () => {
    const blogs = ref([])
    const error = ref(null)

  const fetchBlog = async () => {
    try {
      await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=c')
      .then(res => res.json())
      .then(data => blogs.value = data.meals)
 
    } catch (err) {
      error.value = 'unable to fetch the data at the moment'
    }
  }

  

  return {blogs, error, fetchBlog}
}

export default getBlog