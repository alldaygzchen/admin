const { createApp, onMounted, ref } = Vue;
const { useToast } = primevue.usetoast;
const { FilterMatchMode } = primevue.api;

const DataTable = {
  setup() {
    onMounted(() => {
      productService.value
        .getProducts()
        .then((data) => (products.value = data));
    });

    const toast = useToast();
    const dt = ref();
    const products = ref();
    const productDialog = ref(false);
    const deleteProductDialog = ref(false);
    const deleteProductsDialog = ref(false);
    const product = ref({});
    const productService = ref(new ProductService());
    const selectedProducts = ref();
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const submitted = ref(false);
    const statuses = ref([
      { label: "DISALLOW", value: "disallow" },
      { label: "ALLOW", value: "allow" },
      { label: "NULL", value: "null" },
    ]);

    const formatCurrency = (value) => {
      if (value)
        return value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      return;
    };
    const openNew = () => {
      product.value = {};
      submitted.value = false;
      productDialog.value = true;
    };
    const hideDialog = () => {
      productDialog.value = false;
      submitted.value = false;
    };
    const saveProduct = () => {
      submitted.value = true;

      if (product.value.name.trim()) {
        if (product.value.id) {
          product.value.Status = product.value.Status.value
            ? product.value.Status.value
            : product.value.Status;
          products.value[findIndexById(product.value.id)] = product.value;
          toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Product Updated",
            life: 3000,
          });
        } else {
          product.value.id = createId();
          product.value.code = createId();
          product.value.image = "product-placeholder.svg";
          product.value.Status = product.value.Status
            ? product.value.Status.value
            : "DISALLOW";
          products.value.push(product.value);
          toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Product Created",
            life: 3000,
          });
        }

        productDialog.value = false;
        product.value = {};
      }
    };
    const editProduct = (prod) => {
      product.value = { ...prod };
      productDialog.value = true;
    };
    const confirmDeleteProduct = (prod) => {
      product.value = prod;
      deleteProductDialog.value = true;
    };
    const deleteProduct = () => {
      products.value = products.value.filter(
        (val) => val.id !== product.value.id
      );
      deleteProductDialog.value = false;
      product.value = {};
      toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Product Deleted",
        life: 3000,
      });
    };
    const findIndexById = (id) => {
      let index = -1;
      for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
          index = i;
          break;
        }
      }

      return index;
    };
    const createId = () => {
      let id = "";
      var chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    };
    const exportCSV = () => {
      dt.value.exportCSV();
    };
    const confirmDeleteSelected = () => {
      deleteProductsDialog.value = true;
    };
    const deleteSelectedProducts = () => {
      products.value = products.value.filter(
        (val) => !selectedProducts.value.includes(val)
      );
      deleteProductsDialog.value = false;
      selectedProducts.value = null;
      toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Products Deleted",
        life: 3000,
      });
    };

    return {
      dt,
      products,
      productDialog,
      deleteProductDialog,
      deleteProductsDialog,
      product,
      selectedProducts,
      filters,
      submitted,
      statuses,
      formatCurrency,
      openNew,
      hideDialog,
      saveProduct,
      editProduct,
      confirmDeleteProduct,
      deleteProduct,
      findIndexById,
      createId,
      exportCSV,
      confirmDeleteSelected,
      deleteSelectedProducts,
    };
  },
  components: {
    "p-datatable": primevue.datatable,
    column: primevue.column,
    "p-toolbar": primevue.toolbar,
    "p-fileupload": primevue.fileupload,
    "p-rating": primevue.rating,
    "p-toast": primevue.toast,
    "p-inputtext": primevue.inputtext,
    "p-inputnumber": primevue.inputnumber,
    "p-button": primevue.button,
    "p-dialog": primevue.dialog,
    "p-textarea": primevue.textarea,
    "p-dropdown": primevue.dropdown,
    "p-radiobutton": primevue.radiobutton,
  },
};

createApp(DataTable)
  .use(primevue.config.default)
  .use(primevue.toastservice)
  .mount("#datatable");
