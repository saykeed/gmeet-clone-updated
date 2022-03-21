import { ref } from 'vue'


let getBlogDetails = () => {
        const blogdata = ref(null)
          const error = ref('')

          const fetchBlogDetails = async (id) => {
            try {
              await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id)
              .then(res => res.json())
              .then(data => blogdata.value = data.meals[0])
        
            } catch (err) {
             error.value = 'unable to fetch the data at the moment'
            }
          }
  

  return { blogdata, error, fetchBlogDetails }
}

export default getBlogDetails