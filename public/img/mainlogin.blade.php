@extends('layouts.app2')

@section('content')


<div class="block jumbotron">
    <div class="container">
        <div class="row">
            <div class="col-md-6 left"></div>
            <div class="col-md-6 right"></div>
        </div>
    </div>
</div>
<script>
.block {
  background-image: url('http://roz5.hsi.kg/public/assets/img/AIS_logo9.png');
}
</script>

<main role="main">

      <!-- Main jumbotron for a primary marketing message or call to action -->
      <div class="jumbotron bg-info bg-gradient ">
        <div class="container">
          <h2 class="display-4">Информационный реестр D-Жетекчи</h2>
          <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
          <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more »</a></p>
        </div>
      </div>

      <div class="container">
        <!-- Example row of columns -->
        <div class="row">
          <div class="col-md-4">
            <h2>Heading</h2>
            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
            <p><a class="btn btn-secondary" href="#" role="button">View details »</a></p>
          </div>
          <div class="col-md-4">
            <h2>Heading</h2>
            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
            <p><a class="btn btn-secondary" href="#" role="button">View details »</a></p>
          </div>
          <div class="col-md-4">
            <h2>Heading</h2>
            <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
            <p><a class="btn btn-secondary" href="#" role="button">View details »</a></p>
          </div>
        </div>

        <hr>

      </div> <!-- /container -->

    </main>



<!-- 
<div class="jumbotron p-3 p-md-5 text-white rounded bg-dark  d-flex flex-wrap">
    <div class="col-md-6 px-0">
        <h1 class="display-4 font-italic">Информационный реестр D-Жетекчи</h1>
        <p class="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently
            about what's most interesting in this post's contents.</p>
        <p class="lead mb-0"><a href="#" class="text-white font-weight-bold">Continue reading...</a></p>
    </div>
</div> -->

<!-- HTML -->


<!-- <div class="d-grid gap-2 col-3 mx-auto wrapper_inner">


    <a href="{{ route('organizations5') }}" button type="button" class="btn btn-primary btn-lg width 300"><span
            class="icon"><i class="bi bi-cloud-upload-fill"></i></span>
        Перечень организаций здравоохранения Кыргызской Республики</a>

    <a href="{{ route('application') }}" button type="button" class="btn btn-success btn-lg"><span class="icon"><i
                class="bi bi-person-lines-fill"></i></span>
        Резерв кадров руководителей организаций здравоохранения</a>

    <a href="{{ route('auth.get.register') }}" button type="button" class="btn btn-warning btn-lg"><span class="icon"><i
                class="bi bi-card-checklist"></i></span> Пройти регистрацию</a>
    <a href="{{ route('auth.get.login') }}" button type="button" class="btn btn-info btn-lg"> <span class="icon"><i
                class="bi bi-building"></i></span> Войти в личный кабинет</a>
</div> -->

@endsection