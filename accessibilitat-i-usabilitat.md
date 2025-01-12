# Preparació

## Persones involucrades
- Persona que actualment cursa la carrera de psicologia.  
- Un familiar meu.  
- Una persona del meu cercle que no estava assabentada del projecte.  

---

## Tasques a provar

### Filtrar i accedir en un client

#### Accessibilitat 95%
En aquesta part no hi ha hagut cap problema per localitzar la zona per filtrar ni tampoc per saber que per accedir dins del client, calia clicar sobre el contenidor d’aquest.

#### Performance 99%
Pel que fa a la usabilitat, s’ha indicat que es podria reduir el JavaScript.

---

### Crear l’informe d’un client

#### Accessibilitat 96%
Pel que fa a l’accessibilitat:  
Les persones a qui se'ls ha plantejat la tasca han trobat fàcil localitzar com crear un informe. A més de sortir a l'illa superior, si el client seleccionat no té cap informe, apareix un botó de color blau indicant la creació d’un nou informe, aquesta millora ja es va implementar anteriorment perquè al entrar a la vista el missatge que et surt, capta tota l'atenció de l'usuari, i vaig decidir implementar el botó.
Després han entès que calia posar un resum d’aquest informe que han seleccionat i han localitzat el botó per enviar el resum.  
En el cas del primer usuari, un cop creat l’informe, encara que el client seleccionat ja tenia informes anteriors, ha sabut identificar de manera efectiva quin era l’informe que ella havia creat.  

#### Performance 99%
Pel que fa a la usabilitat, s’ha suggerit reduir el JavaScript.

---

### Afegir una cita

#### Accessibilitat 95%
Des del menú inicial, totes les persones han trobat fàcil accedir al calendari situat a la barra lateral de l’aplicació.  
Un cop dins, han localitzat el botó d’afegir cita i han arribat fins al formulari per afegir cita, que es troba a la part inferior en fer clic.  
En un cas concret, a un usuari se li ha hagut d’indicar el format del títol. Per solucionar-ho, s’ha implementat un placeholder que recomana a l’usuari la manera més eficient d’utilitzar aquest camp.  
Després, un cop seleccionat el botó "afegir", els usuaris han pogut efectuar la consulta per a la data assignada a la cita.  

#### Performance 100%
Pel que fa a la usabilitat, no hi ha hagut cap problema. Tot i això, s’han suggerit millores com comprimir el text, entre altres.

---

### Consultar tots els informes d’un client

#### Accessibilitat 96%
Els usuaris, partint del menú inicial, han sabut tornar a accedir dins d’un client.  
Un cop dins, han localitzat fàcilment el botó de **Tots els tests**.  
En seleccionar-lo, dos dels usuaris van preguntar per què no podien modificar els informes.  
Per solucionar aquesta situació, s’ha implementat un missatge que indica que és una vista únicament de lectura, assegurant que els usuaris entenguin que aquesta vista és simplement informativa.

#### Performance 99%
Pel que fa a la usabilitat, s’ha suggerit reduir el JavaScript.

## Conclusió

### Implementació

#### Consultar tots els informes d’un client
- S’ha afegit un missatge que indica que aquesta vista és única i exclusivament de lectura.

#### Afegir una cita
- Implementació d’un placeholder per a indicar la manera més òptima d'omplir el camp, previst per a facilitar l’ús (no obligatòria).

#### Crear l’informe d’un client
- Referent a la creació de l’informe, aquest canvi no ha estat aplicat recentment, sinó que anteriorment ja s’havia implementat.  
  - Es va afegir un botó que apareix quan el client no té cap informe, amb la finalitat de facilitar a l’usuari trobar on crear un nou informe.
