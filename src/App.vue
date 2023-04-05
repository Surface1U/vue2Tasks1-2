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

