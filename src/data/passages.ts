// Doctrinal Mastery passages for the Old Testament unit (Spanish).
// Verse text comes from the official scriptures; key phrases come from the
// Doctrinal Mastery Core Document 2023. Content is intentionally in Spanish.

export type Verse = { n: number; text: string }

export type Passage = {
  id: string
  reference: string
  keyPhrase: string
  verses: Verse[]
}

export const passages: Passage[] = [
  {
    id: "moises-1-39",
    reference: "Moisés 1:39",
    keyPhrase: "“… esta es mi obra y mi gloria: Llevar a cabo la inmortalidad y la vida eterna del hombre”.",
    verses: [
      { n: 39, text: "Porque, he aquí, esta es mi obra y mi gloria: Llevar a cabo la inmortalidad y la vida eterna del hombre." },
    ],
  },
  {
    id: "moises-7-18",
    reference: "Moisés 7:18",
    keyPhrase: "“Y el Señor llamó Sion a su pueblo, porque eran uno en corazón y voluntad”.",
    verses: [
      { n: 18, text: "Y el Señor llamó Sion a su pueblo, porque eran uno en corazón y voluntad, y vivían en rectitud; y no había pobres entre ellos." },
    ],
  },
  {
    id: "abraham-2-9-11",
    reference: "Abraham 2:9–11",
    keyPhrase: "El Señor prometió a Abraham que su descendencia llevaría “este ministerio y sacerdocio a todas las naciones”.",
    verses: [
      { n: 9, text: "Y haré de ti una nación grande y te bendeciré sobremanera, y engrandeceré tu nombre entre todas las naciones, y serás una bendición para tu descendencia después de ti, para que en sus manos lleven este ministerio y sacerdocio a todas las naciones." },
      { n: 10, text: "Y las bendeciré mediante tu nombre; pues cuantos reciban este evangelio serán llamados por tu nombre; y serán considerados tu descendencia, y se levantarán y te bendecirán como padre de ellos;" },
      { n: 11, text: "y bendeciré a los que te bendijeren, y maldeciré a los que te maldijeren; y en ti (es decir, en tu sacerdocio) y en tu descendencia (es decir, tu sacerdocio), pues te prometo que en ti continuará este derecho, y en tu descendencia después de ti (es decir, la descendencia literal, o sea, la descendencia corporal) serán bendecidas todas las familias de la tierra, sí, con las bendiciones del evangelio, que son las bendiciones de salvación, sí, de vida eterna." },
    ],
  },
  {
    id: "abraham-3-22-23",
    reference: "Abraham 3:22–23",
    keyPhrase: "Como espíritus, fuimos “organizad[o]s antes que existiera el mundo”.",
    verses: [
      { n: 22, text: "Y el Señor me había mostrado a mí, Abraham, las inteligencias que fueron organizadas antes que existiera el mundo; y entre todas estas había muchas de las nobles y grandes;" },
      { n: 23, text: "y vio Dios que estas almas eran buenas, y estaba en medio de ellas, y dijo: A estos haré mis gobernantes; pues estaba entre aquellos que eran espíritus, y vio que eran buenos; y me dijo: Abraham, tú eres uno de ellos; fuiste escogido antes de nacer." },
    ],
  },
  {
    id: "genesis-1-26-27",
    reference: "Génesis 1:26–27",
    keyPhrase: "“… creó Dios al hombre a su imagen”.",
    verses: [
      { n: 26, text: "Y dijo Dios: Hagamos al hombre a nuestra imagen, conforme a nuestra semejanza; y tenga dominio sobre los peces del mar, y sobre las aves de los cielos, y sobre las bestias, y sobre toda la tierra y sobre todo animal que se arrastra sobre la tierra." },
      { n: 27, text: "Y creó Dios al hombre a su imagen, a imagen de Dios lo creó; varón y hembra los creó." },
    ],
  },
  {
    id: "genesis-2-24",
    reference: "Génesis 2:24",
    keyPhrase: "“… el hombre […] se allegará a su mujer, y serán una sola carne”.",
    verses: [
      { n: 24, text: "Por tanto, dejará el hombre a su padre y a su madre, y se allegará a su mujer, y serán una sola carne." },
    ],
  },
  {
    id: "genesis-39-9",
    reference: "Génesis 39:9",
    keyPhrase: "“… ¿cómo, pues, haría yo este gran mal y pecaría contra Dios?”.",
    verses: [
      { n: 9, text: "No hay otro mayor que yo en esta casa, y ninguna cosa me ha reservado sino a ti, por cuanto tú eres su esposa; ¿cómo, pues, haría yo este gran mal y pecaría contra Dios?" },
    ],
  },
  {
    id: "exodo-20-3-17",
    reference: "Éxodo 20:3–17",
    keyPhrase: "Los Diez Mandamientos",
    verses: [
      { n: 3, text: "No tendrás dioses ajenos delante de mí." },
      { n: 4, text: "No te harás imagen, ni ninguna semejanza de cosa alguna que esté arriba en el cielo, ni abajo en la tierra, ni en las aguas debajo de la tierra." },
      { n: 5, text: "No te inclinarás a ellas, ni las honrarás, porque yo soy Jehová tu Dios, fuerte, celoso, que visito la maldad de los padres sobre los hijos hasta la tercera y la cuarta generación de los que me aborrecen," },
      { n: 6, text: "y que hago misericordia a millares, a los que me aman y guardan mis mandamientos." },
      { n: 7, text: "No tomarás el nombre de Jehová tu Dios en vano, porque no dará por inocente Jehová al que tomare su nombre en vano." },
      { n: 8, text: "Acuérdate del día del reposo para santificarlo." },
      { n: 9, text: "Seis días trabajarás y harás toda tu obra," },
      { n: 10, text: "mas el séptimo día es reposo para Jehová tu Dios; no harás en él obra alguna, tú, ni tu hijo, ni tu hija, ni tu siervo, ni tu criada, ni tu bestia, ni el extranjero que está dentro de tus puertas." },
      { n: 11, text: "Porque en seis días hizo Jehová los cielos y la tierra, el mar y todas las cosas que en ellos hay, y reposó en el séptimo día; por tanto, Jehová bendijo el día de reposo y lo santificó." },
      { n: 12, text: "Honra a tu padre y a tu madre, para que tus días se alarguen en la tierra que Jehová tu Dios te da." },
      { n: 13, text: "No matarás." },
      { n: 14, text: "No cometerás adulterio." },
      { n: 15, text: "No hurtarás." },
      { n: 16, text: "No dirás contra tu prójimo falso testimonio." },
      { n: 17, text: "No codiciarás la casa de tu prójimo; no codiciarás la esposa de tu prójimo, ni su siervo, ni su criada, ni su buey, ni su asno, ni cosa alguna de tu prójimo." },
    ],
  },
  {
    id: "josue-24-15",
    reference: "Josué 24:15",
    keyPhrase: "“… escogeos hoy a quién sirváis”.",
    verses: [
      { n: 15, text: "Y si mal os parece servir a Jehová, escogeos hoy a quién sirváis; si a los dioses a quienes sirvieron vuestros padres, cuando estuvieron al otro lado del río, o a los dioses de los amorreos en cuya tierra habitáis; pero yo y mi casa serviremos a Jehová." },
    ],
  },
  {
    id: "salmos-24-3-4",
    reference: "Salmos 24:3–4",
    keyPhrase: "“¿Y quién estará en su lugar santo? El limpio de manos y puro de corazón”.",
    verses: [
      { n: 3, text: "¿Quién subirá al monte de Jehová? ¿Y quién estará en su lugar santo?" },
      { n: 4, text: "El limpio de manos y puro de corazón,el que no ha elevado su alma a la vanidadni jurado con engaño." },
    ],
  },
  {
    id: "proverbios-3-5-6",
    reference: "Proverbios 3:5–6",
    keyPhrase: "“Confía en Jehová con todo tu corazón […] y él enderezará tus veredas”.",
    verses: [
      { n: 5, text: "Confía en Jehová con todo tu corazón,y no te apoyes en tu propia prudencia." },
      { n: 6, text: "Reconócelo en todos tus caminos,y él enderezará tus veredas." },
    ],
  },
  {
    id: "isaias-1-18",
    reference: "Isaías 1:18",
    keyPhrase: "“… aunque vuestros pecados sean como la grana, como la nieve serán emblanquecidos”.",
    verses: [
      { n: 18, text: "Venid ahora, dice Jehová, y razonemos juntos: aunque vuestros pecados sean como la grana, como la nieve serán emblanquecidos; aunque sean rojos como el carmesí, vendrán a ser como blanca lana." },
    ],
  },
  {
    id: "isaias-5-20",
    reference: "Isaías 5:20",
    keyPhrase: "“Ay de los que a lo malo llaman bueno, y a lo bueno, malo”.",
    verses: [
      { n: 20, text: "¡Ay de los que a lo malo llaman bueno, y a lo bueno, malo; que hacen de la luz tinieblas y de las tinieblas luz; que ponen lo amargo por dulce y lo dulce por amargo!" },
    ],
  },
  {
    id: "isaias-29-13-14",
    reference: "Isaías 29:13–14",
    keyPhrase: "La restauración del Evangelio es “una obra maravillosa y un prodigio”.",
    verses: [
      { n: 13, text: "Dice, pues, el Señor: Porque este pueblo se me acerca con su boca y con sus labios me honra, pero ha alejado su corazón de mí, y su temor de mí ha sido enseñado por mandamiento de hombres;" },
      { n: 14, text: "por tanto, he aquí que nuevamente haré una obra maravillosa entre este pueblo, una obra maravillosa y un prodigio; porque perecerá la sabiduría de sus sabios, y se desvanecerá la prudencia de sus prudentes." },
    ],
  },
  {
    id: "isaias-53-3-5",
    reference: "Isaías 53:3–5",
    keyPhrase: "“Ciertamente llevó [Jesucristo] nuestras enfermedades y sufrió nuestros dolores”.",
    verses: [
      { n: 3, text: "Despreciado y desechado entre los hombres, varón de dolores y experimentado en quebranto; y como que escondimos de él el rostro, fue menospreciado y no lo estimamos." },
      { n: 4, text: "Ciertamente llevó él nuestras enfermedades y sufrió nuestros dolores, y nosotros le tuvimos por azotado, herido por Dios y afligido." },
      { n: 5, text: "Mas él herido fue por nuestras transgresiones, molido por nuestras iniquidades; el castigo de nuestra paz fue sobre él, y por sus heridas fuimos nosotros sanados." },
    ],
  },
  {
    id: "isaias-58-6-7",
    reference: "Isaías 58:6–7",
    keyPhrase: "Las bendiciones del ayuno apropiado",
    verses: [
      { n: 6, text: "¿No es más bien el ayuno que yo escogí: desatar las ligaduras de la maldad, soltar las cargas de opresión, y dejar libres a los quebrantados y romper todo yugo?" },
      { n: 7, text: "¿No consiste en que compartas tu pan con el hambriento y a los pobres errantes alojes en tu casa; en que cuando veas al desnudo, lo cubras y no te escondas del que es tu propia carne?" },
    ],
  },
  {
    id: "isaias-58-13-14",
    reference: "Isaías 58:13–14",
    keyPhrase: "“[Retráete] […] de hacer tu voluntad en mi día santo, y [llámalo] delicia”.",
    verses: [
      { n: 13, text: "Si retraes del día de reposo tu pie, de hacer tu voluntad en mi día santo, y lo llamas delicia, santo, glorioso de Jehová, y lo veneras, no andando en tus propios caminos, ni buscando tu propia voluntad ni hablando tus propias palabras," },
      { n: 14, text: "entonces te deleitarás en Jehová; y yo te haré cabalgar sobre las alturas de la tierra y te daré a comer la heredad de Jacob, tu padre, porque la boca de Jehová lo ha hablado." },
    ],
  },
  {
    id: "jeremias-1-4-5",
    reference: "Jeremías 1:4–5",
    keyPhrase: "“Antes que te formase en el vientre […] te di por profeta a las naciones”.",
    verses: [
      { n: 4, text: "Vino, pues, la palabra de Jehová a mí, diciendo:" },
      { n: 5, text: "Antes que te formase en el vientre, te conocí; y antes que nacieses, te santifiqué; te di por profeta a las naciones." },
    ],
  },
  {
    id: "ezequiel-3-16-17",
    reference: "Ezequiel 3:16–17",
    keyPhrase: "El profeta es “atalaya a la casa de Israel”.",
    verses: [
      { n: 16, text: "Y aconteció que al cabo de los siete días vino a mí la palabra de Jehová, diciendo:" },
      { n: 17, text: "Hijo de hombre, yo te he puesto por atalaya a la casa de Israel; oirás, pues, tú la palabra de mi boca y los amonestarás de mi parte." },
    ],
  },
  {
    id: "ezequiel-37-15-17",
    reference: "Ezequiel 37:15–17",
    keyPhrase: "La Biblia y el Libro de Mormón “serán uno solo en tu mano”.",
    verses: [
      { n: 15, text: "Y vino a mí la palabra de Jehová, diciendo:" },
      { n: 16, text: "Y tú, hijo de hombre, toma ahora un palo y escribe en él: Para Judá, y para los hijos de Israel, sus compañeros. Toma después otro palo y escribe en él: Para José, palo de Efraín, y para toda la casa de Israel, sus compañeros." },
      { n: 17, text: "Júntalos luego el uno con el otro, para que sean uno solo, y serán uno solo en tu mano." },
    ],
  },
  {
    id: "daniel-2-44-45",
    reference: "Daniel 2:44–45",
    keyPhrase: "Dios “levantará un reino que no será jamás destruido”.",
    verses: [
      { n: 44, text: "Y en los días de estos reyes, el Dios del cielo levantará un reino que no será jamás destruido ni será dejado el reino a otro pueblo; despedazará y consumirá a todos estos reinos, pero él permanecerá para siempre." },
      { n: 45, text: "De la manera que viste que del monte fue cortada una piedra, no con mano, la cual despedazó el hierro, el bronce, el barro cocido, la plata y el oro; el gran Dios ha hecho saber al rey lo que ha de acontecer en lo por venir; y el sueño es verdadero, y fiel su interpretación." },
    ],
  },
  {
    id: "amos-3-7",
    reference: "Amós 3:7",
    keyPhrase: "“… Jehová el Señor […] revel[a] su secreto a sus siervos los profetas”.",
    verses: [
      { n: 7, text: "Porque no hará nada Jehová el Señor sin que revele su secreto a sus siervos los profetas." },
    ],
  },
  {
    id: "malaquias-3-8-10",
    reference: "Malaquías 3:8–10",
    keyPhrase: "Las bendiciones de pagar el diezmo",
    verses: [
      { n: 8, text: "¿Robará el hombre a Dios? Pues vosotros me habéis robado. Y dijisteis: ¿En qué te hemos robado? En vuestros diezmos y ofrendas." },
      { n: 9, text: "Malditos sois con maldición, porque vosotros, la nación toda, me habéis robado." },
      { n: 10, text: "Traed todos los diezmos al alfolí, y haya alimento en mi casa; y probadme ahora en esto, dice Jehová de los ejércitos, si no os abriré las ventanas de los cielos y derramaré sobre vosotros bendición hasta que sobreabunde." },
    ],
  },
  {
    id: "malaquias-4-5-6",
    reference: "Malaquías 4:5–6",
    keyPhrase: "Elías “hará volver […] el corazón de los hijos hacia los padres”.",
    verses: [
      { n: 5, text: "He aquí, yo os envío a Elías el Profeta antes que venga el día de Jehová, grande y terrible." },
      { n: 6, text: "Él hará volver el corazón de los padres hacia los hijos, y el corazón de los hijos hacia los padres, no sea que yo venga y hiera la tierra con maldición." },
    ],
  },
]
