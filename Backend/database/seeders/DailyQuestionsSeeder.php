<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\DailyQuestion;

class DailyQuestionsSeeder extends Seeder
{
    public function run(): void
    {
        $questions = [
             // May
   
    ['date' => '2025-05-13', 
    'question' => 'On this day in 1993, which Belgian       		forward, known for his time at Manchester United and       	Inter Milan, was born?', 
    'options' => json_encode(['Romelu Lukaku', 'Eden Hazard',      'Kevin De Bruyne', 'Dries Mertens']), 
    'correct_answer' => 'Romelu Lukaku'],

   ['date' => '2025-05-14', 
    'question' => 'On this day in 1984, which Dutch       		midfielder, known for his time at Real Madrid and 		Inter Milan, was born?', 
    'options' => json_encode(['Wesley Sneijder', 
    'Arjen Robben', 'Clarence Seedorf', 'Edgar Davids']),          'correct_answer' => 'Wesley Sneijder'],

   ['date' => '2025-05-15', 
    'question' => 'On May 15th, which club won their first          ever Premier League title?', 
    'options' => json_encode(['Chelsea', 'Manchester United',      'Blackburn Rovers', 'Arsenal']), 
    'correct_answer' => 'Blackburn Rovers'],

   ['date' => '2025-05-16', 
    'question' => 'On May 16th, which country hosted the            final of the UEFA Cup (now Europa League)?', 
    'options' => json_encode(['Spain', 'England', 'Italy',         'France']), 
    'correct_answer' => 'England'],

   ['date' => '2025-05-17', 
    'question' => 'On May 17th, which club won the UEFA Cup         Winners\' Cup final?', 
    'options' => json_encode(['FC Barcelona', 'Sampdoria',         'Arsenal', 'Real Zaragoza']), 
    'correct_answer' => 'FC Barcelona'],

   ['date' => '2025-05-18', 
    'question' => 'On this day in 1976, which legendary       	Italian forward, known for his time at AS Roma, was       	born?', 
    'options' => json_encode(['Francesco Totti', 
    'Alessandro Del Piero', 'Filippo Inzaghi', 
    'Christian Vieri']), 
    'correct_answer' => 'Francesco Totti'],

   ['date' => '2025-05-19', 
    'question' => 'On May 19th, which manager announced       	his departure from Manchester United after a long and          successful tenure?', 
    'options' => json_encode(['Sir Alex Ferguson', 
    'Matt Busby', 'Jos  Mourinho', 'Louis van Gaal']),             'correct_answer' => 'Sir Alex Ferguson'],


   ['date' => '2025-05-20', 
    'question' => 'On May 20th, which club defeated Ajax to         win the UEFA Cup final?', 
    'options' => json_encode(['Juventus', 
    'Manchester United', 'Borussia Dortmund', 
    'Inter Milan']),
    'correct_answer' => 'Manchester United'],


   ['date' => '2025-05-21', 
    'question' => 'On May 21st, which player scored the             winning goal for Liverpool in the FA Cup final against         Arsenal?', 
    'options' => json_encode(['Michael Owen', 
    'Steven Gerrard', 'Ian Rush', 'Robbie Fowler']), 
    'correct_answer' => 'Michael Owen'],

   ['date' => '2025-05-22', 
    'question' => 'On this day in 1987, which Chilean       		midfielder, known for his time at Juventus and Bayern       	Munich, was born?', 
    'options' => json_encode(['Arturo Vidal', 
    'Alexis S nchez', 'Gary Medel', 'Claudio Bravo']), 
    'correct_answer' => 'Arturo Vidal'],

   ['date' => '2025-05-23', 
    'question' => 'On May 23rd, which player scored twice for       Real Madrid in the UEFA Champions League final against         Atl tico Madrid?', 
    'options' => json_encode(['Cristiano Ronaldo',                 'Gareth Bale', 'Sergio Ramos', 'Karim Benzema']),              'correct_answer' => 'Cristiano Ronaldo'],

   ['date' => '2025-05-24', 
    'question' => 'On May 24th, 
     which player scored a memorable back-heel goal for             Manchester United against West Ham United in the Premier       League?', 
    'options' => json_encode(['Cristiano Ronaldo', 
    'Wayne Rooney', 'Dimitar Berbatov', 'Robin van Persie']),      'correct_answer' => 'Cristiano Ronaldo'],


   ['date' => '2025-05-25', 
    'question' => 'On May 25th, which manager led Porto to an       unexpected victory in the UEFA Champions League final          against Monaco?', 
    'options' => json_encode(['Carlo Ancelotti',
    'Jos  Mourinho', 'Didier Deschamps', 'Rafael Ben tez']),       'correct_answer' => 'Jos  Mourinho'],


   ['date' => '2025-05-26', 
    'question' => 'On May 26th, which club staged a dramatic        comeback to win the UEFA Champions League final against        Bayern Munich?', 
    'options' => json_encode(['Liverpool', 'Manchester              United', 'Real Madrid', 'AC Milan']), 
    'correct_answer' => 'Manchester United'],

   ['date' => '2025-05-27', 
    'question' => 'On May 27th, which manager led Bayern            Munich to victory in the UEFA Champions League final           against Borussia Dortmund?', 
    'options' => json_encode(['Jupp Heynckes', 
    'Pep Guardiola', 'Ottmar Hitzfeld', 'Louis van Gaal']), 
    'correct_answer' => 'Jupp Heynckes'],

   ['date' => '2025-05-28', 
    'question' => 'On May 28th, which club won the UEFA             Champions League after defeating Juventus in the final         held in Cardiff?', 
    'options' => json_encode(['FC Barcelona', 'Real Madrid',       'Bayern Munich', 'Atl tico Madrid']), 
    'correct_answer' => 'Real Madrid'],

   ['date' => '2025-05-29', 
    'question' => 'On May 29th, which club defeated Valencia       to win the UEFA Champions League final?', 
    'options' => json_encode(['Real Madrid', 'Bayern Munich',      'Liverpool', 'Inter Milan']), 
    'correct_answer' => 'Real Madrid'],

   ['date' => '2025-05-30', 
    'question' => 'On this day in 1980, which legendary 		Liverpool captain was born?', 
    'options' => json_encode(['Steven Gerrard', 
    'Kenny Dalglish', 'Graeme Souness', 'Phil Thompson']),         'correct_answer' => 'Steven Gerrard'],

//  June

   ['date' => '2025-06-01', 
    'question' => 'On this day in 1992, which Spanish             footballer was born, later to play for Barcelona?', 
    'options' => json_encode(['Gerard Piqu ', 'Sergio Ramos',      'David Villa', 'Andr s Iniesta']), 
    'correct_answer' => 'Gerard Piqu '],

   ['date' => '2025-06-02', 
    'question' => 'On this day in 1988, which Manchester City       legend was born?', 
    'options' => json_encode(['Sergio Ag ero', 'David Silva',      'Vincent Kompany', 'Yaya Tour ']), 
    'correct_answer' => 'Sergio Ag ero'],

   ['date' => '2025-06-03', 
    'question' => 'On June 3rd, which club secured their            place in the Premier League after a dramatic playoff           final at Wembley?', 
    'options' => json_encode(['West Ham United', 'Queens Park       Rangers', 'Crystal Palace', 'Norwich City']),                 'correct_answer' => 'Queens Park Rangers'],

   ['date' => '2025-06-04', 
    'question' => 'On this day in 1975, which Hollywood star        and former wrestler, known for being a football player         in his youth, was born?', 
    'options' => json_encode(['Dwayne "The Rock" Johnson',         'John Cena', 'Dave Bautista', 'Hulk Hogan']),                  'correct_answer' => 'Dwayne "The Rock" Johnson'],


   ['date' => '2025-06-05', 
    'question' => 'Which Brazilian footballer, born on this         day in 1981, is widely considered one of the greatest          players of all time?', 
    'options' => json_encode(['Ronaldo Naz rio',                   'Ronaldinho', 'Kak ', 'Cafu']), 
    'correct_answer' => 'Ronaldo Naz rio'],
   
   ['date' => '2025-06-06', 
    'question' => 'On this day in 1961, which former             	professional football player and current sports                commentator was born?', 
    'options' => json_encode(['Gary Lineker', 'Alan Shearer',      'Rio Ferdinand', 'Michael Owen']), 
    'correct_answer' => 'Gary Lineker'],


   ['date' => '2025-06-07', 
    'question' => 'On June 7th, which country defeated Italy        in the final of the UEFA European Championship on              penalties?', 
    'options' => json_encode(['Spain','Germany',                   'Portugal', 'France']), 
    'correct_answer' => 'Spain'],

  ['date' => '2025-06-08', 
   'question' => 'On this day in 1977, which American rapper,      known for his love of football, was born?', 
   'options' => json_encode(['Kanye West', 'Eminem', 'Jay-Z',     'Snoop Dogg']), 
   'correct_answer' => 'Kanye West'],


   ['date' => '2025-06-09', 
    'question' => 'On this day in 1981, which German forward,       known for his time at K ln, was born?', 
    'options' => json_encode(['Lukas Podolski', 
    'Miroslav Klose', 'J rgen Klinsmann', 
    'Oliver Bierhoff']), 
    'correct_answer' => 'Lukas Podolski'],

   ['date' => '2025-06-10', 
    'question' => 'On June 10th, which country defeated Italy       in the final of the UEFA European Championship?', 
    'options' => json_encode(['Spain', 'Germany', 'France',        'Greece']), 
    'correct_answer' => 'Spain'],

   ['date' => '2025-06-11', 
    'question' => 'On this day in 1987, which Spanish             midfielder, known for his time at Sevilla and Barcelona,       was born?', 
    'options' => json_encode(['Ivan Rakitic', 
    'Andr s Iniesta', 'Xavi Hern ndez', 'Sergio Busquets']), 
    'correct_answer' => 'Ivan Rakitic'],


   ['date' => '2025-06-12', 
    'question' => 'On this day in 1992, which Brazilian             forward, known for his time at Liverpool and Barcelona,        was born?', 
    'options' => json_encode(['Philippe Coutinho', 'Neymar',       'Roberto Firmino', 'Gabriel Jesus']), 
    'correct_answer' => 'Philippe Coutinho'],


   ['date' => '2025-06-13', 
    'question' => 'On this day in 1985, which Argentine             forward, who played for Inter Milan, was born?', 
    'options' => json_encode(['Diego Milito', 'Lionel Messi',      'Sergio Ag ero', 'Gonzalo Higua n']), 
    'correct_answer' => 'Diego Milito'],

   ['date' => '2025-06-14', 
    'question' => 'On this day in 1981, which former English       footballer was born?', 
    'options' => json_encode(['Joe Cole', 'Frank Lampard',         'Steven Gerrard', 'Michael Owen']), 
    'correct_answer' => 'Joe Cole'],


   ['date' => '2025-06-15', 
    'question' => 'On June 15th, which club completed the           signing of a young forward from Santos, who later became       a global superstar?', 
    'options' => json_encode(['FC Barcelona', 'Real Madrid',       'Manchester City', 'Paris Saint-Germain']),                    'correct_answer' => 'FC Barcelona'],


   ['date' => '2025-06-16', 
    'question' => 'On June 16th, which club announced the           signing of Zlatan Ibrahimovic?', 
    'options' => json_encode(['AC Milan', 'Inter Milan',           'Juventus', 'FC Barcelona']), 
    'correct_answer' => 'FC Barcelona'],

   ['date' => '2025-06-17', 
    'question' => 'On this day in 1987, which Slovakian             midfielder, known for his time at Napoli, was born?',         'options' => json_encode(['Marek Ham  k', 
    'Martin  krtel', 'Peter Pekar k', 'Juraj Kucka']), 
    'correct_answer' => 'Marek Ham  k'],


   ['date' => '2025-06-18', 
    'question' => 'On this day in 1986, which Uruguayan             goalkeeper, known for his time at Nacional and the             national team, was born?', 
    'options' => json_encode(['Fernando Muslera', 
    'Diego Forl n', 'Luis Su rez', 'Edinson Cavani']), 
    'correct_answer' => 'Fernando Muslera'],

   ['date' => '2025-06-19', 
    'question' => 'On June 19th, which player scored a famous       Panenka penalty in the UEFA European Championship semi-        final shootout?', 
    'options' => json_encode(['Anton n Panenka', 'Michel            Platini', 'Marco van Basten', 'Francesco Totti']),            'correct_answer' => 'Anton n Panenka'],

   ['date' => '2025-06-20', 
    'question' => 'On this day in 1987, which Argentine             superstar was born?', 
    'options' => json_encode(['Lionel Messi', 
    'Diego Maradona', 'Gabriel Batistuta', 'Sergio Ag ero']),      'correct_answer' => 'Lionel Messi'],

   ['date' => '2025-06-21', 
    'question' => 'On June 21st, which country defeated             Brazil to win the FIFA World Cup final?', 
    'options' => json_encode(['Italy', 'France', 'Germany',        'Argentina']), 
    'correct_answer' => 'France'],

   ['date' => '2025-06-22', 
    'question' => 'On this day in 1949, which legendary             American soccer goalkeeper was born?', 
    'options' => json_encode(['Tony Meola', 'Kasey Keller',        'Tim Howard', 'Brad Friedel']), 
    'correct_answer' => 'Tony Meola'],


   ['date' => '2025-06-23', 
    'question' => 'On this day in 1972, which French football       legend was born?', 
    'options' => json_encode(['Zinedine Zidane', 
    'Thierry Henry', 'Michel Platini', 'Didier Deschamps']),       'correct_answer' => 'Zinedine Zidane'],

   ['date' => '2025-06-24', 
    'question' => 'On June 24th, which player scored a              memorable long-range goal for England against Croatia          at Euro 2004?', 
    'options' => json_encode(['Wayne Rooney', 
    'Steven Gerrard', 'Frank Lampard', 'Paul Scholes']), 
    'correct_answer' => 'Paul Scholes'],

   ['date' => '2025-06-25', 
    'question' => 'On June 25th, which country eliminated           England from the FIFA World Cup on penalties?', 
    'options' => json_encode(['Portugal', 'Argentina',             'Germany', 'Brazil']), 
    'correct_answer' => 'Portugal'],

   ['date' => '2025-06-26', 
    'question' => 'On June 26th, which player scored a famous       chipped penalty against England in the UEFA European           Championship quarter-final shootout?', 
    'options' => json_encode(['Andrea Pirlo', 'Francesco            Totti', 'Alessandro Del Piero', 'Daniele De Rossi']),         'correct_answer' => 'Andrea Pirlo'],

   ['date' => '2025-06-27', 
    'question' => 'On June 27th, which player scored a              stunning free-kick for England against Greece to secure        World Cup qualification?', 
    'options' => json_encode(['David Beckham', 'Steven              Gerrard', 'Frank Lampard', 'Paul Scholes']), 
    'correct_answer' => 'David Beckham'],

   ['date' => '2025-06-28', 
    'question' => 'On June 28th, which player scored the            winning goal for Germany in the UEFA European                  Championship final against Czech Republic?', 
    'options' => json_encode(['Oliver Bierhoff', 
    'J rgen Klinsmann', 'Matthias Sammer', 
    'Karl-Heinz Riedle']), 
    'correct_answer' => 'Oliver Bierhoff'],

   ['date' => '2025-06-29', 
    'question' => 'On June 29th, which national team defeated       Germany to win the UEFA European Championship final?',        'options' => json_encode(['Spain', 'Italy', 'France',          'Portugal']),
    'correct_answer' => 'Spain'],


  ['date' => '2025-06-30', 
   'question' => 'On this day in 1985, which American         	swimmer, known for his Olympic medals and love of           	football, was born?', 
   'options' => json_encode(['Michael Phelps', 'Ryan Lochte',     'Caeleb Dressel', 'Mark Spitz']), 
   'correct_answer' => 'Michael Phelps'],

// July

   ['date' => '2025-07-01', 
    'question' => 'On July 1st, which club officially signed        David Beckham?', 
    'options' => json_encode(['Real Madrid', 'Manchester            United', 'AC Milan', 'LA Galaxy']), 
    'correct_answer' => 'Real Madrid'],

   ['date' => '2025-07-02', 
    'question' => 'On July 2nd, which country hosted the            final of the 1994 FIFA World Cup?', 
    'options' => json_encode(['United States', 'Italy',            'Brazil', 'Germany']), 
    'correct_answer' => 'United States'],

   ['date' => '2025-07-03', 
    'question' => 'On July 3rd, which striker completed a           controversial transfer from Barcelona to Real Madrid?',       'options' => json_encode(['Luis Figo', 'Ronaldo', 
    'Samuel Eto\'o', 'Michael Laudrup']), 
    'correct_answer' => 'Luis Figo'],

   ['date' => '2025-07-04', 
    'question' => 'On July 4th, which country defeated Greece       to win the UEFA European Championship final?', 
    'options' => json_encode(['Portugal', 'Spain', 
    'Czech Republic', 'Netherlands']), 
    'correct_answer' => 'Greece'],

   ['date' => '2025-07-05', 
    'question' => 'On July 5th, which South American nation         won their first Copa Am rica title in 1993?', 
    'options' => json_encode(['Argentina', 'Brazil',               'Uruguay', 'Colombia']), 
    'correct_answer' => 'Argentina'],

   ['date' => '2025-07-06', 
    'question' => 'On July 6th, which South American nation         won the Copa Am rica title by defeating Brazil in the          final?', 
    'options' => json_encode(['Argentina', 'Uruguay',              'Chile', 'Paraguay']), 
    'correct_answer' => 'Argentina'],

   ['date' => '2025-07-07', 
    'question' => 'On July 7th, which player scored a 
     hat-trick for Brazil against Sweden in the FIFA World          Cupsemi-final?', 
    'options' => json_encode(['Romario', 'Ronaldo', 'Bebeto',      'Rivaldo']), 
    'correct_answer' => 'Romario'],

   ['date' => '2025-07-08', 
    'question' => 'On July 8th, which club announced the            signing of a highly-rated young forward who went on to         become a global superstar?', 
    'options' => json_encode(['FC Barcelona', 
    'Manchester United', 'Arsenal', 'Bayern Munich']), 
    'correct_answer' => 'FC Barcelona'],

   ['date' => '2025-07-09', 
    'question' => 'On July 9th, which player scored a               memorable volley for France against England at Euro            2004?', 
    'options' => json_encode(['Zinedine Zidane', 'Thierry           Henry', 'Patrick Vieira', 'Robert Pir s']), 
    'correct_answer' => 'Zinedine Zidane'],

   ['date' => '2025-07-10', 
    'question' => 'On July 10th, which player completed a           record-breaking transfer to Real Madrid?', 
    'options' => json_encode(['Zinedine Zidane', 
    'Cristiano Ronaldo', 'Gareth Bale', 'Kak ']), 
    'correct_answer' => 'Zinedine Zidane'],

   ['date' => '2025-07-11', 
    'question' => 'On July 11th, which player scored the            winning goal for Spain in the FIFA World Cup final             against Netherlands?', 
    'options' => json_encode(['Andr s Iniesta', 'David              Villa', 'Xavi Hern ndez', 'Fernando Torres']), 
    'correct_answer' => 'Andr s Iniesta'],

   ['date' => '2025-07-12', 
    'question' => 'On July 12th, which player scored the            golden goal in the UEFA European Championship final?',        'options' => json_encode(['David Trezeguet', 'Oliver            Bierhoff', 'Marco van Basten', 'Gerd M ller']),               'correct_answer' => 'David Trezeguet'],

   ['date' => '2025-07-13', 
    'question' => 'On July 13th, which country defeated             Argentina to win the FIFA World Cup final in Brazil?',        'options' => json_encode(['Germany', 'Spain', 'Italy',         'Netherlands']), 
    'correct_answer' => 'Germany'],

   ['date' => '2025-07-14', 
    'question' => 'On July 14th, which player completed a           big-money move from Liverpool to Chelsea?', 
    'options' => json_encode(['Fernando Torres', 'Steven            Gerrard', 'Luis Su rez', 'Xabi Alonso']), 
    'correct_answer' => 'Fernando Torres'],

   ['date' => '2025-07-15', 
    'question' => 'On July 15th, which young player made a          high-profile move from Ajax to Barcelona?', 
    'options' => json_encode(['Luis Su rez', 'Zlatan                Ibrahimovic', 'Frenkie de Jong', 'Matthijs de Ligt']),        'correct_answer' => 'Luis Su rez'],


        ];

        // Insert all questions at once
        DailyQuestion::insert($questions);
    }
}
