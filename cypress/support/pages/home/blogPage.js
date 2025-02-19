import BasePage from '../basePage'

const selectors = {
  navBar: '.header__navigation',
  form: '[id=details] > form > div > div',
  cookie: '.footer-cookies > div > div > div:nth-child(2)',
  blogId: '.blog-grid > :nth-child(3)'
}

class BlogPage extends BasePage{

}
export default BlogPage