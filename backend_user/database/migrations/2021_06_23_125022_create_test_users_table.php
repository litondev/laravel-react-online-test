<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTestUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('test_users', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("test_id")->unsigned();        
            $table->bigInteger("user_id")->unsigned();
            // $table->timestamp("start_at")->nullable();
            // $table->timestamp("end_at")->nullable();
            $table->enum("packet",["A","B","C","D","E"])->default("A");
            $table->bigInteger("score")->default(0);
            $table->bigInteger("right_answer")->default(0);
            $table->bigInteger("wrong_answer")->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('test_users');
    }
}
