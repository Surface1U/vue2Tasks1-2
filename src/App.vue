<template>
  <body>
  <div class="container">
  <form>
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" class="form-control" id="name" v-model="name">
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" class="form-control" id="email" v-model="email">
    </div>
    <div class="form-group">
      <label for="message">Message</label>
      <textarea class="form-control" id="message" v-model="message"></textarea>
    </div>
   
   
   //кнопочки начало
    <div class="form-group">
      <button type="button" class="btn btn-primary" @click="submitForm">Submit</button>
      <button type="button" class="btn btn-danger" @click="cancelSubmit" :disabled="!isSubmitting">Cancel</button>
    </div>
  </form>
  </div>
  //кнопочки КАНЕЦ
  
  <footer class="footer">
  <div class="footer__addr">
    <h1 class="footer__logo">Something</h1>

    <h2>Contact</h2>

    <address>
      5534 Somewhere In. The World 22193-10212<br>

      <a class="footer__btn" href="surface812@gmail.com">Email Us</a>
    </address>
  </div>

  <ul class="footer__nav">
    <li class="nav__item">
      <h2 class="nav__title">Media</h2>

      <ul class="nav__ul">
        <li>
          <a href="#">Online</a>
        </li>

        <li>
          <a href="#">Print</a>
        </li>

        <li>
          <a href="#">Alternative Ads</a>
        </li>
      </ul>
    </li>

    <li class="nav__item nav__item--extra">
      <h2 class="nav__title">Technology</h2>

      <ul class="nav__ul nav__ul--extra">
        <li>
          <a href="#">Hardware Design</a>
        </li>

        <li>
          <a href="#">Software Design</a>
        </li>

        <li>
          <a href="#">Digital Signage</a>
        </li>

        <li>
          <a href="#">Automation</a>
        </li>

        <li>
          <a href="#">Artificial Intelligence</a>
        </li>

        <li>
          <a href="#">IoT</a>
        </li>
      </ul>
    </li>

    <li class="nav__item">
      <h2 class="nav__title">Legal</h2>

      <ul class="nav__ul">
        <li>
          <a href="#">Privacy Policy</a>
        </li>

        <li>
          <a href="#">Terms of Use</a>
        </li>

        <li>
          <a href="#">Sitemap</a>
        </li>
      </ul>
    </li>
  </ul>

  <div class="legal">
    <p>&copy; 2019 Something. All rights reserved.</p>

    <div class="legal__links">
      <span>Made with <span class="heart">♥</span> remotely from Anywhere</span>
    </div>
  </div>
</footer>
</body>

</template>


<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      message: '',
      isSubmitting: false,
      abortController: null
    }
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true;
      this.abortController = new AbortController();
      const signal = this.abortController.signal;

      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('email', this.email);
      formData.append('message', this.message);

      try {
        const response = await fetch('https://formcarry.com/s/{yourID}', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          },
          signal
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log(result);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Form submission was canceled.');
        } else {
          console.error('There was a problem submitting the form:', error);
        }
      } finally {
        this.isSubmitting = false;
        this.abortController = null;
      }
    },
    cancelSubmit() {
      if (this.abortController) {
        this.abortController.abort();
      }
    }
  }
}
</script>



<style>
*, *:before, *:after {
  box-sizing: border-box;
}

html {
  font-size: 100%;
}

body {
  font-family: acumin-pro, system-ui, sans-serif;
  margin: 0;
  display: grid;
  grid-template-rows: auto 1fr auto;
  font-size: 14px;
  background-color: #f4f4f4;
  align-items: start;
  min-height: 100vh;
}

.footer {
  display: flex;
  flex-flow: row wrap;
  padding: 30px 30px 20px 30px;
  color: #2f2f2f;
  background-color: #fff;
  border-top: 1px solid #e5e5e5;
}

.footer > * {
  flex:  1 100%;
}

.footer__addr {
  margin-right: 1.25em;
  margin-bottom: 2em;
}

.footer__logo {
  font-family: 'Pacifico', cursive;
  font-weight: 400;
  text-transform: lowercase;
  font-size: 1.5rem;
}

.footer__addr h2 {
  margin-top: 1.3em;
  font-size: 15px;
  font-weight: 400;
}

.nav__title {
  font-weight: 400;
  font-size: 15px;
}

.footer address {
  font-style: normal;
  color: #999;
}

.footer__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  max-width: max-content;
  background-color: rgb(33, 33, 33, 0.07);
  border-radius: 100px;
  color: #2f2f2f;
  line-height: 0;
  margin: 0.6em 0;
  font-size: 1rem;
  padding: 0 1.3em;
}

.footer ul {
  list-style: none;
  padding-left: 0;
}

.footer li {
  line-height: 2em;
}

.footer a {
  text-decoration: none;
}

.footer__nav {
  display: flex;
	flex-flow: row wrap;
}

.footer__nav > * {
  flex: 1 50%;
  margin-right: 1.25em;
}

.nav__ul a {
  color: #999;
}

.nav__ul--extra {
  column-count: 2;
  column-gap: 1.25em;
}

.legal {
  display: flex;
  flex-wrap: wrap;
  color: #999;
}

.legal__links {
  display: flex;
  align-items: center;
}

.heart {
  color: #2f2f2f;
}

@media screen and (min-width: 24.375em) {
  .legal .legal__links {
    margin-left: auto;
  }
}

@media screen and (min-width: 40.375em) {
  .footer__nav > * {
    flex: 1;
  }

  .nav__item--extra {
    flex-grow: 2;
  }

  .footer__addr {
    flex: 1 0px;
  }

  .footer__nav {
    flex: 2 0px;
  }
}
</style>
