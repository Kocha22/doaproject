<template>
<div class="content-wrapper">

    <section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6 mt-1 md-1">
                <h1>Личный кабинет</h1>
            </div>
            <div class="col-sm-6">



            </div>
        </div>
    </div><!-- /.container-fluid -->
</section>

<div id="res"></div>



<!-- Main content -->
<section class="content">
  
    <div class="container-fluid">
        <!-- Small boxes (Stat box) -->

        <div class="row">

            <div class="col-lg-6 col-6">
                <a href="#">
                    <div class="info-box bg-info">
                        <span class="info-box-icon">111</span>

                        <div class="info-box-content">
                            <span class="info-box-text">
                                <h5>Земельный фонд органики</h5>
                            </span>




                        </div>

                        <!-- /.info-box-content -->
                    </div>
                </a> <!-- /.info-box -->
            </div>

            <div class="col-lg-6 col-6">

                <a href="#">
                    <div class="info-box bg-warning">
                        <span class="info-box-icon">140</span>

                        <div class="info-box-content">
                            <span class="info-box-text">
                                <h5>Производители органической продукции </h5>
                            </span>




                        </div>
                        <!-- /.info-box-content -->
                    </div>
                </a>

                <!-- /.info-box -->
            </div>



        </div>



        <div class="row">

            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-info">
                    <div class="inner">
                        <h3>ДОСХ</h3>

                        <p>Пилотные хозяйства</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-bag"></i>
                    </div>
                    <a href="{{ route('createapplicant') }}" class="small-box-footer">Перейти <i
                            class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-success">
                    <div class="inner">
                        <h3>БИО-КГ<sup style="font-size: 20px"></sup></h3>

                        <p>Перечень производителей</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-stats-bars"></i>
                    </div>
                    <a href="#" class="small-box-footer">Перейти <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-warning">
                    <div class="inner">
                        <h3>Заявки</h3>

                        <p>Поданные заявления</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-person-add"></i>
                    </div>
                    <a href="#" class="small-box-footer">Перейти <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-danger">
                    <div class="inner">
                        <h3>Сертификаты</h3>

                        <p>Перечень сертификатов</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-pie-graph"></i>
                    </div>
                    <a href="#" class="small-box-footer">Перейти <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
            <!-- ./col -->
        </div>
        <!-- /.row -->
        <!-- Main row -->
        <div class="row">
            <!-- Left col -->

           


         
            <!-- right col -->
        </div>
        <!-- /.row (main row) -->
    </div><!-- /.container-fluid -->
    <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1vgIxnwuv-LtMGufoDYWTv7yh71qwRKI&ehbc=2E312F" width="900" height="600"></iframe>
        
</section>
<!-- /.content -->

<!-- Control Sidebar -->
<aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
</aside>

</div>


</template>