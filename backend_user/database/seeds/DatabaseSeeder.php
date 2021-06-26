<?php

use Illuminate\Database\Seeder;
use App\Models\{
    User,
    Type
};

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
    	User::create([
    		"name" => "admin",
    		"number" => 0,
    		"role" => "admin",
    		"password" => "12345678"
    	]);

    	$user = User::create([
    		"name" => "user",
    		"number" => 1,
    		"password" => "12345678"
    	]);

    
        $level = "sd";

        for($iType=0;$iType<3;$iType++){
            $start_at_type = now()
                ->addDays($iType*3)
                ->toDateTimeString();                        

            $end_at_type = now()
                ->parse($start_at_type)
                ->addDays(3-1)
                ->toDateTimeString();            

            $type = Type::create([
                "name" => "Ujian ".$level." Qwerty ".$iType,
                "start_at" => $start_at_type,
                "end_at" => $end_at_type,            
            ]);

            $mapel = ["IPS","IPA","BI"];

            for($iTest=0;$iTest<count($mapel);$iTest++){
                $start_at_test = now()
                    ->addDays(($iType*3)+$iTest)
                    ->toDateTimeString();                

                $end_at_test = now()
                    ->addDays(($iType*3)+$iTest)
                    ->addHours(2)
                    ->toDateTimeString();

                $test = $type->tests()->create([
                    "name" => "Ujian ".$level." Qwerty ".$iType." ".$mapel[$iTest],
                    "mapel" => $mapel[$iTest],
                    "start_at" => $start_at_test,
                    "end_at" => $end_at_test,
                    "level" => $level,            
                ]);

                $packet = ["A","B"];

                for($iTask=0;$iTask<10;$iTask++){
                    $task = $test->tasks()->create([
                        "packet" => $packet[rand(0,1)],
                        "text" => "Apakah Itu?"
                    ]);                

                    $abcd = ["A","B","C","D"];

                    $is_answer_right = false;

                    for($iAnswer=0;$iAnswer<count($abcd);$iAnswer++){  
                        $is_right = rand(0,1);

                        $task->answers()->create([
                            "text" => "Jawaban ".$abcd[$iAnswer],                                        
                            "is_right" => $is_answer_right ? false : $is_right
                        ]);

                        if($is_right === 1){
                            $is_answer_right = true;
                        }                        
                    }          

                    if($iTask == 9){
                        $task->task_files()->create([
                            "file" => "test.png",
                            "type" => "image"
                        ]);
                    }      
                }
            }
        }

        $user->test_users()->create([
            "test_id" => 1,
            "packet" => "B", 
        ]);
    }
}   
