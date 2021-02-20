export default {
  setIsClientLoaded(state, isLoaded) {
    state.isClientLoaded = isLoaded;
  },
  setTonClient(state, client) {
    state.tonClient = client;
  },
  switchTheme(state, theme) {
    state.theme = !theme;
  },
  setIsMobile(state, isMobile) {
    state.isMobile = isMobile;
  },
  setIsTxSuccessful(state, isSuccessful) {
    state.isTxSuccessful = isSuccessful;
  },
  setShowAlert(state, show) {
    state.showAlert = show;
  },
  setAlertText(state, text) {
    state.alertText = text;
  },
  setStakeAdresses(state, addresses) {
    state.clientAddress = addresses.src;
    state.dePoolAddress = addresses.dePoolAddress;
  },
  setStakeResults(state, results) {
    state.stakeResults = results;
  },
  setIsStakeLoading(state, isLoading) {
    state.isStakeLoading = isLoading;
  },
  setDePoolList(state, list) {
    state.dePoolList = list;
  },
  setShowSnackbar(state, isOpened) {
    state.isSnackbarOpened = isOpened;
  },
  setDePoolsAmount(state, amount) {
    state.dePoolsAmount = amount;
  },
  setClientStakes(state, stakes) {
    state.clientStakes = stakes;
  },
  setIsWithdrawLoading(state, isLoading) {
    state.isWithdrawLoading = isLoading;
  },
  setClientSeed(state, seed) {
    state.clientSeed = seed;
  },
  setClientAddress(state, address) {
    state.clientAddress = address;
  },
  setClientBalance(state, balance) {
    state.clientBalance = balance;
  },
  setClientSecretKey(state, secret) {
    state.clientSecretKey = secret;
  },
  setClientPublicKey(state, publicKey) {
    state.clientPublicKey = publicKey;
  },
  setIsLoggedIn(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
  },
  setIsStakesLoaded(state, isLoaded) {
    state.isStakesLoaded = isLoaded;
  },
  setCurrentClientContract(state, contract) {
    state.currentClientContract = contract;
  },
  resetClientLoginCredentials(state) {
    state.clientAddress = '';
    state.clientSeed = '';
    state.clientPublicKey = '';
    state.clientSecretKey = '';
  },
};
