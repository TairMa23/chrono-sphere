import { StyleSheet } from 'react-native'


export default StyleSheet.create({
  form_container: {
    width: "60%",
    marginTop: 30,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    width: "100%",
    fontSize: 18,
    marginBottom: 12
  },
  container: { flex: 1,
     alignItems: 'center',
    justifyContent: 'center', 
      backgroundColor: '#F5F5DC' },
      
 container_app: { 
  flex: 1,
  backgroundColor: '#F5F5DC' },
  rowContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
t_input:{
    backgroundColor: "white",
    borderRadius: 20,
    height: 30,
    width:200,
    paddingLeft: 20
  },
  title: { color: '#DB2D43', fontSize: 30 },
  logo_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btn_txt: {
    fontSize: 20,
  },
  btn: {
    borderRadius: 12,
    padding: 12,
    width: "100%",
    fontSize: 18,
    alignItems: "center",
  },
  outline_btn: {
    width: '100%',

    fontSize: 18,
    alignItems: "center",
    borderRadius: 12,
    padding: 12,
    marginTop: 12
  },
  outline_btn_txt: {
    fontSize: 16,
  },

})