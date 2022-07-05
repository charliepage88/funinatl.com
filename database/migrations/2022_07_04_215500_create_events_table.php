<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('slug');
            $table->integer('location_id')->nullable();
            $table->integer('user_id')->nullable();
            $table->integer('category_id')->nullable();
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->string('price_min')->nullable();
            $table->string('price_max')->nullable();
            $table->string('start_time')->nullable();
            $table->string('end_time')->nullable();
            $table->text('short_description')->nullable();
            $table->text('description')->nullable();
            $table->boolean('featured')->default(false);
            $table->boolean('active')->default(false);
            $table->string('source')->default('provider');
            $table->boolean('is_sold_out')->default(false);
            $table->boolean('is_family_friendly')->default(false);
            $table->string('website')->nullable();

            $table->softDeletes();
            $table->timestamps();

            $table->index([
                'slug',
                'location_id',
                'category_id',
                'start_date',
                'end_date',
                'featured',
                'active',
                'is_sold_out'
            ], 'events_indexes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
};
