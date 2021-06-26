<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tests', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("type_id")->unsigned();
            $table->string("name",50);
            $table->text("mapel")->nullable();
            $table->timestamp("start_at")->nullable();
            $table->timestamp("end_at")->nullable();
            $table->enum("level",["sd","smp","smk","sma","kuliah","general"])->default("general");
            $table->boolean("is_reveal")->default(1);
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
        Schema::dropIfExists('tests');
    }
}
