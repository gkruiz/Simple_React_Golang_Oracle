package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	//"encoding/json"
	"database/sql"
	godror "github.com/godror/godror"
	"encoding/hex"
	"strconv"

	"github.com/tidwall/gjson"
	//goracle "gopkg.in/goracle.v2"
)

var Port = ":5555"

func main() {
	//EndPoints
	http.HandleFunc("/", homepage)
	http.HandleFunc("/RegistraUsuario", RegistraUsuario)
	http.HandleFunc("/RecuperarContrasena", RecuperarContrasena)
	http.HandleFunc("/Loguearse", Loguearse)
	http.HandleFunc("/getImage", RetImage)
	http.HandleFunc("/updateInfo", UpdateInfoUsu)
	http.HandleFunc("/NuevaTemporada", NuevaTemporada)
	http.HandleFunc("/getTemporadas", getTemporadas)



	http.HandleFunc("/consulta", cons)
	http.HandleFunc("/articles", returnAllArticles)

	//Inicia Servidor
	fmt.Println("Serving @ : ", "http://127.0.0.1"+Port)
	log.Fatal(http.ListenAndServe(Port, nil))
}

func cons(w http.ResponseWriter, r *http.Request) {
	fmt.Println("consulta")

	dbQuery2 := "select Max(ID) as ID from usuario"
	var ID int
	consultaRow(dbQuery2).Scan(&ID)
	fmt.Println(ID)
}

//Ejemplo
func returnAllArticles(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,access-control-allow-origin, access-control-allow-headers")

	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Println("error reading body", err)
	}

	jsonResp := string(data)
	value := gjson.Get(jsonResp, "fotox")
	mensaje := value.String()
	println(mensaje)

	fmt.Println("MensajeBody: ", string(data))
	fmt.Println("Endpoint: /articles")

	//fmt.Fprintf(w, mensaje+" GServer\n")
	fmt.Fprintf(w, "\"mensaje:'"+mensaje+"'\"")

}





//INICIA edpoints    ****************************************************************************

func homepage(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Home")
	fmt.Fprintf(w, "Backend Golang: 127.0.0.1:5555")
}



//devuelve temporadas general 
func getTemporadas(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,access-control-allow-origin, access-control-allow-headers")
	fmt.Println("Endpoint: /GetTemporadas")

	

	
  var ID int
  var identificador string
  var fecha_inicio string
  var fecha_final string
  var idias int
  var fdias int
  var anoInicio int
  var anoFinal int
  var estado string

	//var ind:=getIndex();
dbQuery2 := "SELECT * FROM TEMPORADA where"
	rows:=consultaRows(dbQuery2)
	for rows.Next()  {
	
		err := rows.Scan(&ID,&identificador ,&fecha_inicio ,&fecha_final ,&idias ,&fdias ,&anoInicio ,&anoFinal ,&estado )
		if err != nil {
			//log.Fatal(err)
		}
		fmt.Println(ID)
fmt.Println(identificador)
fmt.Println(fecha_inicio)
	}
	
	
}







func NuevaTemporada(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,access-control-allow-origin, access-control-allow-headers")
	fmt.Println("Endpoint: /NuevaTemporada")
	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Println("error reading body", err)
	}

	jsonResp := string(data)
	AnoInicio := (gjson.Get(jsonResp, "AnoIni")).String()
	AnoFinal := (gjson.Get(jsonResp, "AnoFin")).String()
	InicioDias := (gjson.Get(jsonResp, "IniD")).String()
	FinalDias := (gjson.Get(jsonResp, "FinD")).String()
	fecha_inicio := (gjson.Get(jsonResp, "FI")).String()
	fecha_final := (gjson.Get(jsonResp, "FF")).String()
	
	//resultado debe ser cero
	dbQuery2 := "SELECT count(ID) as ID FROM TEMPORADA "
	dbQuery2 += " WHERE anoInicio='" + AnoInicio + "' and "
	dbQuery2 += " anoFinal='" + AnoFinal + "' and "
	dbQuery2 += " (idias<'" + FinalDias + "' or "
	dbQuery2 += " fdias>'" + InicioDias + "')"

	var countV int
	consultaRow(dbQuery2).Scan(&countV)
	fmt.Println(countV)
	

	if(countV==0){
		//consulta para obtener id
		dbQuery3 := "select Max(ID) as ID from TEMPORADA"
		var IDM int
		consultaRow(dbQuery3).Scan(&IDM)
		IDM = IDM + 1
		
		dbQuery4 := "INSERT INTO TEMPORADA ( "
		dbQuery4 += " ID,"
		dbQuery4 += " identificador,"
		dbQuery4 += " fecha_inicio,"
		dbQuery4 += " fecha_final,"
		dbQuery4 += " idias,"
		dbQuery4 += " fdias,"
		dbQuery4 += " anoInicio,"
		dbQuery4 += " anoFinal,"
		dbQuery4 += " estado)VALUES("
		dbQuery4 += " " + strconv.Itoa(IDM) + " , "
		dbQuery4 += " '" + (AnoInicio)+"-Q"+strconv.Itoa(IDM)+ "' , "
		dbQuery4 += " '" + fecha_inicio + "' , "
		dbQuery4 += " '" + fecha_final + "' , "
		dbQuery4 += " " + (InicioDias) + " , "
		dbQuery4 += " " + (FinalDias) + " , "
		dbQuery4 += " " + (AnoInicio) + " , "
		dbQuery4 += " " + (AnoFinal) + " , "
		dbQuery4 += " '1' ) "
		
		consultaRow(dbQuery4)
		fmt.Fprintf(w, "bien")
	}else{
		//existe traslape entre temporadas
		fmt.Fprintf(w, "error")
	}
	//fmt.Fprintf(w, fotos)



}



func UpdateInfoUsu(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,access-control-allow-origin, access-control-allow-headers")
	fmt.Println("Endpoint: /RetImage")
	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Println("error reading body", err)
	}

	jsonResp := string(data)
	usuario := (gjson.Get(jsonResp, "usuariox")).String()
	nombre := (gjson.Get(jsonResp, "nombrex")).String()
	apellido := (gjson.Get(jsonResp, "apellidox")).String()
	tier := (gjson.Get(jsonResp, "tierx")).String()
	fecha_nacimiento := (gjson.Get(jsonResp, "fecha_nacimientox")).String()
	correo_electronico := (gjson.Get(jsonResp, "correo_electronicox")).String()
	new_pass := (gjson.Get(jsonResp, "new_passx")).String()
	cambio := (gjson.Get(jsonResp, "cambio")).String()

	dbQuery2 := "UPDATE USUARIO SET "
	dbQuery2 += " nombre='" + nombre + "',"
	dbQuery2 += " apellido='" + apellido + "',"
	dbQuery2 += " tier='" + tier + "',"
	dbQuery2 += " fecha_nacimiento='" + fecha_nacimiento + "',"
	dbQuery2 += " correo_electronico='" + correo_electronico + "' "
	if cambio == "1" {
		dbQuery2 += ", password='" + new_pass + "' "
	}

	dbQuery2 += " where usuario='" + usuario + "'"

	consultaRows(dbQuery2)
	//fmt.Println(fotos)

}

func RetImage(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,access-control-allow-origin, access-control-allow-headers")
	fmt.Println("Endpoint: /RetImage")
	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Println("error reading body", err)
	}

	jsonResp := string(data)
	usuario := (gjson.Get(jsonResp, "usuario")).String()

	dbQuery2 := "select foto from USUARIO where usuario='" + usuario + "'"
	var fotos string
	consultaRow(dbQuery2).Scan(&fotos)
	//fmt.Println(fotos)
	fmt.Fprintf(w, fotos)

}

func RegistraUsuario(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,access-control-allow-origin, access-control-allow-headers")

	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Println("error reading body", err)
	}

	jsonResp := string(data)
	usuario := (gjson.Get(jsonResp, "usuario")).String()
	passwordc := (gjson.Get(jsonResp, "passwordx")).String()
	nombre := (gjson.Get(jsonResp, "nombrex")).String()
	apellido := (gjson.Get(jsonResp, "apellidox")).String()
	tier := (gjson.Get(jsonResp, "tierx")).String()
	fecha_nacimiento := (gjson.Get(jsonResp, "fecha_nacimientox")).String()
	correo_electronico := (gjson.Get(jsonResp, "correo_electronicox")).String()
	foto := (gjson.Get(jsonResp, "photox")).String()
	//binlar:=stringToBin(foto)
	//fmt.Println(foto)
	binlar := hex.EncodeToString([]byte(foto))

	fmt.Println("Endpoint: /RegistraUsuario")

	if (usuario != "") && (passwordc != "") && (nombre != "") && (apellido != "") && (tier != "") && (fecha_nacimiento != "") && (correo_electronico != "") {
		//dt := time.Now()
		//fmt.Println(dt.Format("2017-09-07"))
		year, month, day := time.Now().Date()
		fecha_regis := strconv.Itoa(int(year)) + "-" + strconv.Itoa(int(month)) + "-" + strconv.Itoa(int(day))
		fmt.Println(fecha_regis)

		//para increment ID++
		dbQuery2 := "select Max(ID) as ID from usuario"
		var IDM int
		consultaRow(dbQuery2).Scan(&IDM)
		IDM = IDM + 1
		//fmt.Println(strconv.Itoa(IDM))
		//fmt.Println(binlar)
		//Inicia registro de usuario
		dbQuery := "insert into Usuario(ID,usuario,password,nombre,apellido,tier,fecha_nacimiento,fecha_registro,correo_electronico,foto)values(" + strconv.Itoa(IDM) + ",'" + usuario + "','" + passwordc + "','" + nombre + "','" + apellido + "','" + tier + "','" + fecha_nacimiento + "','" + fecha_regis + "','" + correo_electronico + "','" + binlar + "')"

		//Inserta la data
		consultaRows(dbQuery)

		fmt.Fprintf(w, "Registro Exitoso")

	} else {
		fmt.Fprintf(w, "Registro Fallo")
	}

}

func Loguearse(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,access-control-allow-origin, access-control-allow-headers")

	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Println("error reading body", err)
	}

	jsonResp := string(data)
	usuario := (gjson.Get(jsonResp, "usuario1")).String()
	contrasena := (gjson.Get(jsonResp, "contrasena1")).String()

	fmt.Println(usuario)
	fmt.Println(contrasena)

	fmt.Println("Endpoint: /Loguearse")

	dbQuery := "select * from USUARIO where usuario='" + usuario + "' and password='" + contrasena + "'"
	row := consultaRow(dbQuery)
	var id string
	var usuariox string
	var passwordx string
	var nombre string
	var apellido string
	var tier string
	var fecha_nacimiento string
	var fecha_registro string
	var correo_electronico string
	var foto string

	//obtiene la data de la consulta

	row.Scan(&id, &usuariox, &passwordx, &nombre, &apellido, &tier, &fecha_nacimiento, &fecha_registro, &correo_electronico, &foto)

	if id != "" {

		infoR := "{"
		infoR += "\"id\":\"" + id + "\","
		infoR += "\"usuario\":\"" + usuariox + "\","
		infoR += "\"password\":\"" + passwordx + "\","
		infoR += "\"nombre\":\"" + nombre + "\","
		infoR += "\"apellido\":\"" + apellido + "\","
		infoR += "\"tier\":\"" + tier + "\","
		infoR += "\"fecha_nacimiento\":\"" + fecha_nacimiento + "\","
		infoR += "\"fecha_registro\":\"" + fecha_registro + "\","
		infoR += "\"correo_electronico\":\"" + correo_electronico + "\","
		infoR += "\"foto\":\"" + foto + "\"}"

		fmt.Fprintf(w, infoR)
	} else {
		fmt.Fprintf(w, "error")
	}

}

//INICIA FUNCIONES GENERICAS--------------------------------------------------------------------
var db *sql.DB

func consultaRows(dbQuery string) *sql.Rows {

	username := "root"
	password := "12345678"
	host := "localhost:1521"
	database := "XE"
	
	db= new sql.DB;
	fmt.Println("... Setting up Database Connection consultaRows")
	var err error
	db, err = sql.Open("godror", username+"/"+password+"@"+host+"/"+database)
	if err != nil {
		fmt.Println("... DB Setup Failed")
		//fmt.Println(err)

	}
	defer db.Close()

	rows, err := db.Query(dbQuery)

	if err != nil {
		fmt.Println(".....Error processing query en consultaRows")
		//fmt.Println(err)

	} else {

		defer rows.Close()
	}

	return rows
}



func getIndex(tabla string) int {

	tama:=consultaRow("SELECT COUNT(*) FROM "+tabla)
	var i int	

	tama.Scan(&i)

	return i;
}



func consultaRow(dbQuery string) *sql.Row {

	username := "root"
	password := "12345678"
	host := "localhost:1521"
	database := "XE"

	fmt.Println("... Setting up Database Connection consultaRow")
	db, err := sql.Open("goracle", username+"/"+password+"@"+host+"/"+database)
	if err != nil {
		fmt.Println("... DB Setup Failed")
		//fmt.Println(err)

	}
	defer db.Close()

	fmt.Println("... Opening Database Connection")
	if err = db.Ping(); err != nil {
		fmt.Println("Error connecting to the database: %s\n", err)

	}
	fmt.Println("... Connected to Database")
	var serverVersion godror.VersionInfo

	fmt.Println("DB Version : ", serverVersion)

	row := db.QueryRow(dbQuery)

	return row
}

func stringToBin(s string) (binString string) {
	for _, c := range s {
		binString = fmt.Sprintf("%s%b", binString, c)
	}
	return
}

func RecuperarContrasena(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,access-control-allow-origin, access-control-allow-headers")

	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Println("error reading body", err)
	}

	jsonResp := string(data)
	correo := (gjson.Get(jsonResp, "correo1")).String()

	fmt.Println(correo)

	//fmt.Println("MensajeBody: ", string(data))
	fmt.Println("Endpoint: /RecuperarContrasena")

	//fmt.Fprintf(w, mensaje+" GServer\n")
	fmt.Fprintf(w, "\"mensaje:'"+correo+"'\"")

}
