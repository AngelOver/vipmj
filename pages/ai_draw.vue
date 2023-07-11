<template>

    <div style="width: 260px; margin-left: 1px;"
         class="flex h-full flex-col border-r-blue-200 bg-[#fafbfc] draw-list-left"
    >
        <a-tabs @tab-click="handleClick" v-model="activeDraw" type="capsule" size="large"
                class="justify-content-center mt-2">
            <a-tab-pane title="普通绘画" key="gpt" v-if="counter.setting.is_open_normal_draw==1">
                <div class="left-panel-setting-block__header">
                    <div class="left-panel-setting-block__title fs-5"> 图片尺寸</div>
                </div>
                <div class="flex items-center justify-between space-x-1 aspect">
                    <button v-for="(s,s_index) in all_size"
                            :class="size==s.value?'active':''"
                            @click="change_size(s.value)"
                            class="flex-1 border-2 rounded aspect-item dark:border-neutral-700">
                        <div
                            class="flex items-center justify-center w-5 h-5 mx-auto my-2 aspect-box-wrapper">
                            <div class="border-2 rounded aspect-box dark:border-neutral-700"
                                 :style="`width:${s.width}%;height:${s.height}%`"
                            ></div>
                        </div>
                        <p class="mb-1 text-sm text-center">
                            {{ s.label }}
                        </p>
                    </button>
                </div>

                <div class="left-panel-setting-block__header">
                    <div class="left-panel-setting-block__title fs-5"> 图片数量</div>
                </div>
                <div class="UXmDHLrm">
                        <span v-for="(i,i_index) in images_list" :key="i_index"
                              :class="image_select==i.value?'OMJ2YPhL':''"
                              @click="change_i(i.value)">{{ i.name }}</span>
                </div>
            </a-tab-pane>
            <a-tab-pane title="精致绘画" key="dream" v-if="counter.setting.is_dream_open==1">
                <div class="left-panel-setting-block__header">
                    <div class="left-panel-setting-block__title fs-5"> 图片尺寸</div>
                </div>
                <div class="slider-demo-block flex-wrap">
                    <span class="demonstration">图片高度：</span>

                    <a-slider class="ml-1.5 mr-1.5" :min="512" :max="1024" v-model="value_height" :step="64"
                              show-ticks/>
                </div>
                <div class="slider-demo-block flex-wrap">
                    <span class="demonstration">图片宽度：</span>
                    <a-slider class="ml-1.5 mr-1.5" :min="512" :max="1024" v-model="value_width" :step="64"
                              show-ticks/>
                </div>
                <div class="left-panel-setting-block__header">
                    <div class="left-panel-setting-block__title fs-5"> 图片数量</div>
                </div>
                <div class="UXmDHLrm">
                        <span v-for="(i,i_index) in images_list" :key="i_index"
                              :class="image_select==i.value?'OMJ2YPhL':''"
                              @click="change_i(i.value)">{{ i.name }}</span>
                </div>
            </a-tab-pane>
            <a-tab-pane title="Midjourney" key="midj" v-if="counter.setting.midjourney_is_open==1">
                <div class="left-panel-setting-block__header">
                    <div class="left-panel-setting-block__title mt-2  fs-5">图片比例
                        <a-tooltip content="参数释义：生成图片尺寸比例">
                            <icon-exclamation-circle class="font-18 ml-1"/>
                        </a-tooltip>
                    </div>
                </div>
                <div class="flex items-center justify-between space-x-1 aspect">
                    <button v-for="(b,b_index) in bili" @click="choose_bili=b.value"
                            :class="choose_bili==b.value?'active':''"
                            class="flex-1 border-2 rounded aspect-item dark:border-neutral-700">
                        <div
                            class="flex items-center justify-center w-5 h-5 mx-auto my-2 aspect-box-wrapper">
                            <div class="border-2 rounded aspect-box dark:border-neutral-700"
                                 :style="`width:${b.width}%;height:${b.height}%`"></div>
                        </div>
                        <p class="mb-1 text-sm text-center">{{ b.name }}</p>
                    </button>
                </div>
                <!--model select-->
                <div class="left-panel-setting-block__header">
                    <div class="left-panel-setting-block__title mt-2  fs-5">模型选择
                        <a-tooltip content="MJ：通用模型
                        NIJI：动漫风格模型">
                            <icon-exclamation-circle class="font-18 ml-1"/>
                        </a-tooltip>
                    </div>
                </div>
                <ul class="flex justify-content-center mj_version">
                    <li class="version-item"
                        @click="version=1"
                        :class="version==1?'active':''">
                        <button

                            class="relative overflow-hidden border-4 rounded-md dark:border-neutral-700">
                            <div
                                class="absolute flex items-center justify-center w-full h-full bg-black/20"><span
                                class="text-lg font-bold text-white">MJ</span></div>
                            <img class="object-cover w-full h-full" src="@/assets/images/mj.jpg">
                        </button>
                    </li>
                    <li class="version-item"
                        @click="version=2"
                        :class="version==2?'active':''">
                        <button
                            class="relative overflow-hidden border-4 rounded-md dark:border-neutral-700">
                            <div
                                class="absolute flex items-center justify-center w-full h-full bg-black/20"><span
                                class="text-lg font-bold text-white">NIJI</span></div>
                            <img class="object-cover w-full h-full" src="@/assets/images/niji.jpg">
                        </button>
                    </li>
                </ul>
                <div class="flex items-center justify-between space-x-2 mt-2">
                    <span class="w-[70px]">版本</span>
                    <div class="flex-1" v-if="version==1">
                        <a-select v-model="version_me" placeholder="选择版本">
                            <a-option v-for="item of mj_version" :value="item.value" :label="item.label"/>
                        </a-select>
                    </div>
                    <div class="flex-1" v-else>
                        <a-select v-model="version_nj" placeholder="选择版本">
                            <a-option v-for="item of nj_version" :value="item.value" :label="item.label"/>
                        </a-select>
                    </div>
                </div>
                <div class="flex items-center justify-between space-x-2 mt-2" v-if="version==1">
                    <span class="w-[70px]">RAW</span>
                    <div class="flex-1">
                        <a-switch v-model="mj_row"/>
                    </div>
                    <a-tooltip content="呈现的人物写实感更加逼真,人物细节、光源、流畅度也更加接近原始作品">
                        <icon-exclamation-circle class="font-18 ml-1"/>
                    </a-tooltip>
                </div>
                <div class="flex items-center justify-between space-x-2 mt-2" v-if="version==2">
                    <span class="w-[70px]">风格</span>
                    <div class="flex-1">
                        <a-select v-model="niji_style" placeholder="选择风格">
                            <a-option v-for="item of niji_style_v" :value="item.value" :label="item.label"/>
                        </a-select>
                    </div>

                </div>
                <!--model select end-->
                <!--model can -->
                <div class="left-panel-setting-block__header">
                    <div class="left-panel-setting-block__title mt-2 fs-5">参数</div>
                </div>
                <div class="flex items-center justify-between space-x-2 mt-2">
                    <span class="w-[70px]">画质</span>
                    <div class="flex-1">
                        <a-select v-model="pic_select" placeholder="画质选择">
                            <a-option v-for="item of pic_quality" :value="item.value" :label="item.label"/>
                        </a-select>
                    </div>
                    <a-tooltip content="参数释义：更高质量需要更长的时间处理更多细节">
                        <icon-exclamation-circle class="font-18 ml-1"/>
                    </a-tooltip>
                </div>
                <div class="flex items-center justify-between space-x-2 mt-2">
                    <span class="w-[70px]">混乱</span>
                    <div class="flex-1">
                        <a-input-number v-model="chaos" :min="0" :max="100"/>
                    </div>
                    <a-tooltip content="参数释义：较高值将产生意想不到的结果和成分 较低值具有更可靠、可重复的结果">
                        <icon-exclamation-circle class="font-18 ml-1"/>
                    </a-tooltip>
                </div>
                <div class="left-panel-setting-block__header">
                    <div class="left-panel-setting-block__title fs-5">风格化
                        <a-tooltip content="参数释义：数值越高，画面表现也会更具丰富性和艺术性">
                            <icon-exclamation-circle class="font-18 ml-1"/>
                        </a-tooltip>
                    </div>
                </div>
                <a-space>
                    <a-button type="primary" @click="style=50">低</a-button>
                    <a-button type="primary" @click="style=100">中</a-button>
                    <a-button type="primary" @click="style=250">高</a-button>
                    <a-button type="primary" @click="style=750">强烈</a-button>
                </a-space>
                <a-input-number class="mt-2" v-model="style" :min="0" :max="750"/>
                <div class="left-panel-setting-block__header">
                    <div class="left-panel-setting-block__title mt-2 fs-5">设定信息</div>
                </div>

                <div class="flex items-center justify-between space-x-2 mt-2">
                    <span class="w-[70px]">携带参数</span>
                    <div class="flex-1">
                        <a-switch v-model="is_pic"/>
                    </div>
                </div>

                <div class="left-panel-setting-block__header">
                    <div class="left-panel-setting-block__title mt-2 fs-5">图片参数
                        <a-tooltip content="参数释义：根据上传的图片生成对应的类型图">
                            <icon-exclamation-circle class="font-18 ml-1"/>
                        </a-tooltip>
                    </div>
                </div>
                <div class="miji_pic">
                    <a-upload
                        class="avatar-uploader"
                        :action="actions"
                        :show-file-list="false"
                        :headers="{'Authorization': 'Bearer ' + token}"
                        @before-upload="beforeUpload"
                        @success="picSuccess"
                        draggable
                    >
                        <template #upload-button>
                            <div
                            >
                                <div
                                    class="arco-upload-list-picture w-100 custom-upload-avatar"
                                    v-if="imageUrl"
                                >
                                    <img class="w-auto" :src="imageUrl"/>
                                    <div class="arco-upload-list-picture-mask">
                                        <IconPlus />

                                    </div>
                                    <icon-delete @click="deletePic" />
                                </div>
                                <div class="arco-upload-picture-card" v-else>
                                    <div class="arco-upload-picture-card-text">
                                        <icon-cloud class="fs-2" />
                                        <div>点击或拖拽一张图片到这，支持PNG或JPG格式</div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </a-upload>

                </div>


            </a-tab-pane>
        </a-tabs>

    </div>
    <div class="main">
        <div class="editor-panel">
            <div class="editor-panel__content bg-ai w-100">
                <div class="ai-header" style="top: 0px; height: 60px;">
                    <div class="ai-header__left" @click="change_drawer()">
                        <icon-menu-unfold size="24"/>
                    </div>
                    <div class="ai-header__logo ai-header__logo--mobile"><span><a class="ai-header__link"><img
                        :src="counter.setting.logo" style="width: 40px;"></a></span>
                    </div>
                    <div class="ai-header__right">
                        <div class="ai-page__right">
                            <div placement="bottomRight">
                                <div>
                                    <div>
                                        <a-tooltip class="item" effect="dark" :content="'额度：'+user_balance"
                                                   placement="bottom">
                                            <div class="creation"><img
                                                src="@/assets/images/header_jifen.png"
                                                class="creation-count__icon">
                                            </div>
                                        </a-tooltip>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="editor-panel__right-panel p-10">
                    <client-only>
                        <div class="main-body mt-2">

                        <h4 class="inline mr-2">AI绘图

                        </h4>
                        <a-tooltip  position="bottom">
                            <template #content>
                                <div class="left-panel-footer__spend-tip  text-white"><img
                                    src="~/assets/images/jifen.png"
                                    class="left-panel-footer__icon mr-2"> 普通绘图{{ ai_draw_pay }}/1张<br>
                                    Midj绘图{{ mj_midj }}/1张
                                </div>
                            </template>
                            <icon-exclamation-circle class="font-18"/>
                        </a-tooltip>
                        <div class="left-panel-setting-block__header">
                            <div class="left-panel-setting-block__title fs-5"> 帮我描述</div>
                        </div>
                        <a-textarea
                            v-model="draw_ai"
                            :auto-size="{ minRows: 3, maxRows: 5 }"
                            type="textarea"
                            placeholder="请输入简单的描述，AI将智能输出绘图内容"
                        />
                        <a-button type="primary" class="w-100 mt-2 mb-2" :loading="draw_loading"
                                  @click="send_ai_draw()">生成绘图描述
                        </a-button>
                        <div class="left-panel-setting-block__header">
                            <div class="left-panel-setting-block__title fs-5"> 灵感需求
                                <a-button :loading="draw_loading" type="primary" status="success" shape="round" class="ml-1" @click="translate()">
                                    <template #icon><icon-translate /></template>
                                    翻译英文
                                </a-button>
                            </div>
                            <div class="ai-writer__panel-section__optional fs-6 cursor-pointer"
                                 @click="change_prompt()">
                                试试示例
                            </div>
                        </div>
                        <a-textarea
                            v-model="input2"
                            :auto-size="{ minRows: 7, maxRows: 7 }"
                            type="textarea"
                            placeholder="请用英文输入Prompt，参考形式：画面主体，细节描述，修饰词"
                        />
                        <div class="left-panel-footer__button-group">
                            <a-button :loading="draw_loading" v-if="activeDraw=='gpt'" @click="ai_draw()"
                                      class="w-100"
                                      type="primary" size="large">
                                <icon-image class="up_images" />
                                开始绘图
                            </a-button>
                            <a-button :loading="draw_loading" v-else-if="activeDraw=='dream'"
                                      @click="ai_draw_dreams()"
                                      class="w-100" type="primary" size="large">
                                <icon-image class="up_images" />
                                开始绘图
                            </a-button>
                            <a-button :loading="draw_loading" v-else-if="activeDraw=='midj'"
                                      @click="midj_ai_draw_send()" class="w-100" type="primary" size="large">
                                <icon-image class="up_images" />
                                开始绘图
                            </a-button>
                        </div>

                        <!--finish go-->
                        <div class="ernie-vilg-image" v-if="is_sc || is_finish">
                            <div>
                                <div class="ernie-vilg-item-desc" v-if="is_sc || is_finish"
                                     style="margin-bottom: 0px;">
                                    正在生成中，预计需要 60s
                                </div>

                                <div class="eE9d1okq" style="margin-top: 20px;" v-if="is_sc">
                                    <div class="ernie-vilg-image-item" v-for="item in image_select">
                                        <img class="ernie-vilg-image-item-img" src="@/assets/images/loading2.gif">
                                    </div>
                                </div>
                                <div class="eE9d1okq" style="margin-top: 20px;" v-if="is_finish">
                                    <div class="ernie-vilg-image-item" v-for="(image,fi_index) in r_images"
                                         :key="fi_index">
                                        <img class="ernie-vilg-image-item-img" :src="image.url">

                                    </div>
                                </div>

                            </div>
                        </div>

                        <!--finish go end-->
                        <a-tabs @tab-click="handleGme" v-model="activeName" type="capsule" size="large" class="mt-4">
                            <a-tab-pane title="绘画广场" key="first" >
                                <a-row :gutter="20" v-if="public_draw.length>0 && !ske_loading">
                                    <Waterfall :list="public_draw" :crossOrigin=false backgroundColor="#ddd0">

                                        <template #item="{ item, url, index }">
                                                    <div class="item list-animation-bottomIn"
                                                         :class="'delay-'+index"
                                                         >

                                                        <a-image
                                                            class="u-img cursor-pointer"
                                                            :src="item.image"
                                                            :zoom-rate="1.2"
                                                            fit="fill"
                                                            :title="item.title"

                                                        >
                                                            <template #extra>
                                                                <div class="actions">
                                                                    <span class="action" @click="onDownLoad(item.image)"><icon-download /></span>
                                                                    <a-tooltip :content="item.title">
                                                                        <span class="action ml-1"><icon-info-circle /></span>
                                                                    </a-tooltip>
                                                                </div>
                                                            </template>
                                                            <!--<template #loader>-->
                                                            <!--    <img-->
                                                            <!--        src="@/assets/images/pic_load.png"-->
                                                            <!--    />-->
                                                            <!--</template>-->
                                                        </a-image>
                                                    </div>
                                        </template>

                                    </Waterfall>
                                    <!--<waterFull-->
                                    <!--    :images="public_draw"-->
                                    <!--    :columnCount="4"-->
                                    <!--    :columnGap="10"-->
                                    <!--    width="100%"-->
                                    <!--    mode="JS"-->
                                    <!--    backgroundColor="#F2F4F8"/>-->
                                    <div class="mt-10 flex justify-center w-full">
                                        <a-button class="load_more" :loading="load_more_loading" @click="load_more()">
                                            <template #icon>
                                                <icon-refresh />
                                            </template>
                                            加载更多
                                        </a-button>
                                    </div>

                                </a-row>

                                <a-empty description="暂无数据哦~" v-else/>
                                <!--<div class="mt-10 flex justify-center">-->

                                <!--    <a-pagination-->
                                <!--        :current="public_page"-->
                                <!--        :page-size="public_page_size"-->
                                <!--        class="mr-4 ml-4"-->
                                <!--        background-->
                                <!--        hide-on-single-page-->
                                <!--        :total="public_draw_count"-->
                                <!--        @change="public_change"-->
                                <!--    />-->
                                <!--</div>-->
                            </a-tab-pane>
                            <a-tab-pane title="我的绘画" key="second">
                                <a-spin :loading="ske_loading">
                                    <a-row :gutter="20" v-if="me_draw.length>0 && !ske_loading">
                                        <a-col
                                            v-for="(m,m_index) in me_draw" :key="m_index"
                                            :xs="12" :sm="12" :md="24" :lg="12" :xl="6"
                                        >
                                            <a-card :body-style="{ padding: '0px' }" class="mb-2">
                                                <a-image
                                                    :src="m.image?m.image:no_img"
                                                    class="image cursor-pointer"
                                                    fit="fill"
                                                    :initial-index="m_index"
                                                    :style="{
                                                  height: '250px',
                                                    width: '100%',
                                                  overflow: 'hidden',
                                                  display: 'flex',
                                                  justifyContent: 'center',
                                                }"
                                                >
                                                    <template #loader>
                                                        <img
                                                            class="h-full p-3"
                                                            src="@/assets/images/pic_load.png"
                                                        />
                                                    </template>
                                                </a-image>

                                                <div class="progress p-2 bg-white" v-if="m.progress!=100">
                                                    <a-progress :percent="m.progress/100" />
                                                </div>
                                                <div style="padding: 10px 10px" class="me_show_pic">
                                                    <a-tooltip
                                                        placement="top-start"
                                                        title="Prompt:"
                                                        :width="200"
                                                        trigger="hover"
                                                        :content="m.title"

                                                    >
                                                        <span class="w-25">{{ m.title }}</span>
                                                    </a-tooltip>
                                                    <div class="bottom ">
                                                        <a-space>
                                                            <a-button size="small" type="primary" status="danger"
                                                                      :loading="draw_bottom" round class="button"
                                                                      v-if="m.is_public==0"
                                                                      @click="send_pub(0,m.id)"
                                                            >私密
                                                            </a-button>
                                                            <a-button size="small" type="primary"
                                                                      :loading="draw_bottom"
                                                                      round class="button"
                                                                      v-else
                                                                      @click="send_pub(1,m.id)"
                                                            >公开
                                                            </a-button>
                                                            <a-button size="small" type="primary" status="danger"
                                                                      :loading="draw_bottom" round class="button"
                                                                      @click="del_me_draw(m.id)"
                                                            >删除
                                                            </a-button>
                                                        </a-space>

                                                    </div>

                                                </div>
                                                <div class="tags_up  pl-2 mb-2" v-if="m.type=='midjourney'">
                                                    <div class="flex">
                                                        <span>变大：</span>
                                                        <a-button size="mini" v-for="(u,u_index) in 4"
                                                                  :key="u_index"
                                                                  @click="up_image_midj(u_index,m.title,m.prompt_id)"
                                                                  :disabled="up_loading"
                                                                  class="mr-4 cursor-pointer mb-2">
                                                            {{ 'U' + (u_index + 1) }}
                                                        </a-button>

                                                    </div>
                                                    <div class="flex">
                                                        <span>变换：</span>
                                                        <a-button size="mini" v-for="(v,v_index) in 4"
                                                                  :key="v_index"
                                                                  @click="vp_image_midj(v_index,m.title,m.prompt_id)"
                                                                  :disabled="up_loading"
                                                                  class="mr-4 cursor-pointer">
                                                            {{ 'V' + (v_index + 1) }}
                                                        </a-button>
                                                    </div>

                                                </div>
                                                <div class="mt-2 pl-2 mb-2">创建时间：{{ m.created_at }}</div>
                                            </a-card>
                                        </a-col>
                                    </a-row>

                                    <a-empty description="暂无数据哦~" v-else/>
                                    <div class="mt-10 flex justify-center">

                                        <a-pagination
                                            :current="me_page"
                                            :page-size="me_page_size"
                                            class="mr-4 ml-4"
                                            hide-on-single-page
                                            background
                                            :total="me_draw_count"
                                            @change="me_change"
                                        />
                                    </div>
                                </a-spin>

                            </a-tab-pane>
                        </a-tabs>


                    </div>
                    </client-only>
                </div>
            </div>
        </div>
    </div>

    <a-drawer
        v-model:visible="drawer"
        title="配置"
        placement="left"
        class="left_ai_draw"
    >
        <a-tabs @tab-click="handleClick" v-model="activeDraw" type="capsule" size="large"
                class="justify-content-center mt-2">
            <a-tab-pane title="普通绘画" key="gpt" v-if="counter.setting.is_open_normal_draw==1">
                <div class="left-panel-setting-block__header">
                    <div class="left-panel-setting-block__title fs-5"> 图片尺寸</div>
                </div>
                <div class="flex items-center justify-between space-x-1 aspect">
                    <button v-for="(s,s_index) in all_size"
                            :class="size==s.value?'active':''"
                            @click="change_size(s.value)"
                            class="flex-1 border-2 rounded aspect-item dark:border-neutral-700">
                        <div
                            class="flex items-center justify-center w-5 h-5 mx-auto my-2 aspect-box-wrapper">
                            <div class="border-2 rounded aspect-box dark:border-neutral-700"
                                 style="width: 100%; height: 100%;"></div>
                        </div>
                        <p class="mb-1 text-sm text-center">{{ s.label }}</p>
                    </button>
                </div>

                <div class="left-panel-setting-block__header">
                    <div class="left-panel-setting-block__title fs-5"> 图片数量</div>
                </div>
                <div class="UXmDHLrm">
                    <span v-for="(i,i_index) in images_list" :key="i_index" :class="image_select==i.value?'OMJ2YPhL':''"
                          @click="change_i(i.value)">{{ i.name }}</span>
                </div>
            </a-tab-pane>
            <a-tab-pane title="精致绘画" key="dream" v-if="counter.setting.is_dream_open==1">
                <div class="left-panel-setting-block__header">
                    <div class="left-panel-setting-block__title fs-5"> 图片尺寸</div>
                </div>
                <div class="slider-demo-block flex-wrap">
                    <span class="demonstration">图片高度：</span>

                    <a-slider class="ml-1.5 mr-1.5" :min="512" :max="1024" v-model="value_height" :step="64"
                              show-ticks/>
                </div>
                <div class="slider-demo-block flex-wrap">
                    <span class="demonstration">图片宽度：</span>
                    <a-slider class="ml-1.5 mr-1.5" :min="512" :max="1024" v-model="value_width" :step="64" show-ticks/>
                </div>
                <div class="left-panel-setting-block__header">
                    <div class="left-panel-setting-block__title fs-5"> 图片数量</div>
                </div>
                <div class="UXmDHLrm">
                    <span v-for="(i,i_index) in images_list" :key="i_index" :class="image_select==i.value?'OMJ2YPhL':''"
                          @click="change_i(i.value)">{{ i.name }}</span>
                </div>
            </a-tab-pane>
            <a-tab-pane title="Midjourney" key="midj" v-if="counter.setting.midjourney_is_open==1">
                <div class="left-panel-setting-block__header">
                    <div class="left-panel-setting-block__title mt-2  fs-5">图片比例
                        <a-tooltip content="参数释义：生成图片尺寸比例">
                            <icon-exclamation-circle class="font-18 ml-1"/>
                        </a-tooltip>
                    </div>
                </div>
                <div class="flex items-center justify-between space-x-1 aspect">
                    <button v-for="(b,b_index) in bili" @click="choose_bili=b.value"
                            :class="choose_bili==b.value?'active':''"
                            class="flex-1 border-2 rounded aspect-item dark:border-neutral-700">
                        <div
                            class="flex items-center justify-center w-5 h-5 mx-auto my-2 aspect-box-wrapper">
                            <div class="border-2 rounded aspect-box dark:border-neutral-700"
                                 :style="`width:${b.width}%;height:${b.height}%`"></div>
                        </div>
                        <p class="mb-1 text-sm text-center">{{ b.name }}</p>
                    </button>
                </div>
                <!--model select-->
                <div class="left-panel-setting-block__header">
                    <div class="left-panel-setting-block__title mt-2  fs-5">模型选择
                        <a-tooltip content="MJ：通用模型
                        NIJI：动漫风格模型">
                            <icon-exclamation-circle class="font-18 ml-1"/>
                        </a-tooltip>
                    </div>
                </div>
                <ul class="flex justify-content-center mj_version">
                    <li class="version-item"
                        @click="version=1"
                        :class="version==1?'active':''">
                        <button

                            class="relative overflow-hidden border-4 rounded-md dark:border-neutral-700">
                            <div
                                class="absolute flex items-center justify-center w-full h-full bg-black/20"><span
                                class="text-lg font-bold text-white">MJ</span></div>
                            <img class="object-cover w-full h-full" src="@/assets/images/mj.jpg">
                        </button>
                    </li>
                    <li class="version-item"
                        @click="version=2"
                        :class="version==2?'active':''">
                        <button
                            class="relative overflow-hidden border-4 rounded-md dark:border-neutral-700">
                            <div
                                class="absolute flex items-center justify-center w-full h-full bg-black/20"><span
                                class="text-lg font-bold text-white">NIJI</span></div>
                            <img class="object-cover w-full h-full" src="@/assets/images/niji.jpg">
                        </button>
                    </li>
                </ul>
                <div class="flex items-center justify-between space-x-2 mt-2">
                    <span class="w-[70px]">版本</span>
                    <div class="flex-1" v-if="version==1">
                        <a-select v-model="version_me" placeholder="选择版本">
                            <a-option v-for="item of mj_version" :value="item.value" :label="item.label"/>
                        </a-select>
                    </div>
                    <div class="flex-1" v-else>
                        <a-select v-model="version_nj" placeholder="选择版本">
                            <a-option v-for="item of nj_version" :value="item.value" :label="item.label"/>
                        </a-select>
                    </div>
                </div>
                <div class="flex items-center justify-between space-x-2 mt-2" v-if="version==1">
                    <span class="w-[70px]">RAW</span>
                    <div class="flex-1">
                        <a-switch v-model="mj_row"/>
                    </div>
                    <a-tooltip content="呈现的人物写实感更加逼真,人物细节、光源、流畅度也更加接近原始作品">
                        <icon-exclamation-circle class="font-18 ml-1"/>
                    </a-tooltip>
                </div>
                <div class="flex items-center justify-between space-x-2 mt-2" v-if="version==2">
                    <span class="w-[70px]">风格</span>
                    <div class="flex-1">
                        <a-select v-model="niji_style" placeholder="选择风格">
                            <a-option v-for="item of niji_style_v" :value="item.value" :label="item.label"/>
                        </a-select>
                    </div>

                </div>
                <!--model select end-->
                <!--model can -->
                <div class="left-panel-setting-block__header">
                    <div class="left-panel-setting-block__title mt-2 fs-5">参数</div>
                </div>
                <div class="flex items-center justify-between space-x-2 mt-2">
                    <span class="w-[70px]">画质</span>
                    <div class="flex-1">
                        <a-select v-model="pic_select" placeholder="画质选择">
                            <a-option v-for="item of pic_quality" :value="item.value" :label="item.label"/>
                        </a-select>
                    </div>
                    <a-tooltip content="参数释义：更高质量需要更长的时间处理更多细节">
                        <icon-exclamation-circle class="font-18 ml-1"/>
                    </a-tooltip>
                </div>
                <div class="flex items-center justify-between space-x-2 mt-2">
                    <span class="w-[70px]">混乱</span>
                    <div class="flex-1">
                        <a-input-number v-model="chaos" :min="0" :max="100"/>
                    </div>
                    <a-tooltip content="参数释义：较高值将产生意想不到的结果和成分 较低值具有更可靠、可重复的结果">
                        <icon-exclamation-circle class="font-18 ml-1"/>
                    </a-tooltip>
                </div>
                <div class="left-panel-setting-block__header">
                    <div class="left-panel-setting-block__title fs-5">风格化
                        <a-tooltip content="参数释义：数值越高，画面表现也会更具丰富性和艺术性">
                            <icon-exclamation-circle class="font-18 ml-1"/>
                        </a-tooltip>
                    </div>
                </div>
                <a-space>
                    <a-button type="primary" @click="style=50">低</a-button>
                    <a-button type="primary" @click="style=100">中</a-button>
                    <a-button type="primary" @click="style=250">高</a-button>
                    <a-button type="primary" @click="style=750">强烈</a-button>
                </a-space>
                <a-input-number class="mt-2" v-model="style" :min="0" :max="750"/>
                <div class="left-panel-setting-block__header">
                    <div class="left-panel-setting-block__title mt-2 fs-5">设定信息</div>
                </div>

                <div class="flex items-center justify-between space-x-2 mt-2">
                    <span class="w-[70px]">携带参数</span>
                    <div class="flex-1">
                        <a-switch v-model="is_pic"/>
                    </div>
                </div>

                <div class="left-panel-setting-block__header">
                    <div class="left-panel-setting-block__title mt-2 fs-5">图片参数
                        <a-tooltip content="参数释义：根据上传的图片生成对应的类型图">
                            <icon-exclamation-circle class="font-18 ml-1"/>
                        </a-tooltip>
                    </div>
                </div>
                <div class="miji_pic">
                    <a-upload
                        class="avatar-uploader"
                        :action="actions"
                        :show-file-list="false"
                        :headers="{'Authorization': 'Bearer ' + token}"
                        @before-upload="beforeUpload"
                        @success="picSuccess"
                        draggable
                    >
                        <template #upload-button>
                            <div
                            >
                                <div
                                    class="arco-upload-list-picture w-100 custom-upload-avatar"
                                    v-if="imageUrl"
                                >
                                    <img class="w-auto" :src="imageUrl"/>
                                    <div class="arco-upload-list-picture-mask">
                                        <IconPlus />

                                    </div>
                                    <icon-delete @click="deletePic" />
                                </div>
                                <div class="arco-upload-picture-card" v-else>
                                    <div class="arco-upload-picture-card-text">
                                        <icon-cloud class="fs-2" />
                                        <div>点击或拖拽一张图片到这，支持PNG或JPG格式</div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </a-upload>

                </div>


            </a-tab-pane>
        </a-tabs>

    </a-drawer>

</template>

<script setup lang="ts">
import {ref,onMounted} from "vue";
import {useCounter} from '~/store/counter'

const counter = useCounter()
import {
    IconInfoCircleFill,
    IconMenuUnfold,
    IconImage,
    IconCloud,
    IconDelete,
    IconPlus,
    IconDownload,
    IconInfoCircle,
    IconTranslate,
    IconExclamationCircle,
    IconRefresh
} from '@arco-design/web-vue/es/icon';

useHead({
    title: 'AI绘画 - ' + counter.setting.title,
    meta: [
        {name: 'description', content: counter.setting.description},
        {name: 'keywords', content: counter.setting.keywords}
    ]
})

import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'
import {Message} from "@arco-design/web-vue";

const onSuccess = () => {
    console.log('success')
}
const drawer = ref(false)
const change_drawer = () => {
    drawer.value = true
}
const user_balance = ref(0)
const get_user_balance = () => {
    get_siwei_limit().then(res => {
        user_balance.value = res._rawValue.data
    })
}

const actions = counter.setting.APP_URL + '/api/upload_miji'
const imageUrl = ref('');
const deletePic = () => {
    imageUrl.value = ''
}
const beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 15;

    if (!isJPG && !isPNG) {
        Message.error('上传图片只能是 JPG/PNG 格式!')
        return false
    }
    if (!isLt2M) {
        Message.error('上传图片大小不能超过 15MB!')
        return false
    }
    return true
};
const handleGme = (tab: any) => {
    activeName.value = tab
}
const picSuccess = (currentFile) => {
    // 获取currentFile里的response的data值
    if (currentFile.response.status != 200) {
        Message.error('上传失败!')
        return
    }
    Message.success('上传成功!')
    imageUrl.value = currentFile.response.data;
    console.log(imageUrl.value)
};

const activeDraw = ref((counter.setting.is_open_normal_draw == 1) ? 'gpt' : ((counter.setting.is_dream_open == 1) ? 'dream' : 'midj'))
const onError = () => {
    console.log('error')
}
const user_info = useCookie('user_info')
const input2 = ref('')
const size = ref('256x256')
const image_select = ref(1)
const srcList = ref([])
const pub_srcList = ref([])
const mj_midj = ref(0)
const all_size = [
    {
        label: '256x256',
        value: '256x256',
        width: 75,
        height: 75
    },
    {
        label: '512x512',
        value: '512x512',
        width: 100,
        height: 100
    },
    {
        label: '1024x1024',
        value: '1024x1024',
        width: 125,
        height: 125
    },
]
const images_list = ref([
    {
        name: '1',
        value: 1
    },
    {
        name: '2',
        value: 2
    },
    {
        name: '3',
        value: 3
    },
    {
        name: '4',
        value: 4
    },
    {
        name: '5',
        value: 5
    },
    {
        name: '6',
        value: 6
    },
    {
        name: '7',
        value: 7
    },
    {
        name: '8',
        value: 8
    },
    {
        name: '9',
        value: 9
    },
    {
        name: '10',
        value: 10
    },
])
const prompt_info = ref('A young girl stands alone in a field of wildflowers, her hair blowing gently in the breeze. She wears a simple white dress that flows around her as she moves. Her eyes are bright and curious, and her smile is warm and inviting. In the distance, a mountain range rises up, its peaks shrouded in mist. The sun is setting behind her, casting a warm glow across the scene. As she looks out across the landscape, she feels a sense of wonder and possibility, as if anything is possible in this magical world.')
const all_prompt = [
    'A young girl stands alone in a field of wildflowers, her hair blowing gently in the breeze. She wears a simple white dress that flows around her as she moves. Her eyes are bright and curious, and her smile is warm and inviting. In the distance, a mountain range rises up, its peaks shrouded in mist. The sun is setting behind her, casting a warm glow across the scene. As she looks out across the landscape, she feels a sense of wonder and possibility, as if anything is possible in this magical world.',
    'Imagine a handsome man with chiseled features and piercing eyes. His hair is styled in a modern, edgy cut and he wears a perfectly tailored suit that accentuates his muscular physique. He exudes confidence and charisma, commanding attention wherever he goes. Perhaps he\'s standing on a busy street corner, surrounded by skyscrapers and bustling crowds, or maybe he\'s in a sleek, high-tech office overlooking a glittering cityscape. Whatever the setting, he is the epitome of cool and sophistication, a modern-day James Bond.',
    'Picture a handsome young man with striking features, his face chiseled to perfection. His style is reminiscent of a cyberpunk anime character, with sleek, futuristic clothing and a confident, almost cocky demeanor. The colors of his outfit are bold and vibrant, with flashes of neon green and electric blue. His hair is styled in a sharp, angular cut, and his eyes are piercing and intense. He exudes a sense of coolness and danger, as if he\'s always on the edge of some thrilling adventure. This is the kind of person who would fit seamlessly into a high-tech, dystopian future world, where technology and humanity are constantly at odds.',
    'In this scene, we see a traditional Chinese landscape painting come to life. The rolling hills are lush and green, with mist swirling around their peaks. A winding river flows through the valley, its waters a deep shade of blue. The trees are tall and slender, with delicate leaves that rustle in the gentle breeze. In the distance, we can see a small village nestled among the hills, with traditional Chinese architecture and red lanterns hanging from the eaves. The colors of the scene are muted, with shades of green, blue, and brown dominating the palette. The overall effect is one of serenity and tranquility, a timeless vision of the beauty of nature in the Chinese tradition.',
]
const handleClick = (tab: any) => {
    activeDraw.value = tab
}
const choose_bili = ref(1)
const version = ref(1)
const version_me = ref(5.2)
const version_nj = ref(5)
const mj_row = ref(false)
const pic_select = ref(3)
const chaos = ref(0)
const style = ref(100)
const is_pic = ref(true)
const niji_style = ref(1)
const mj_version = [{
    value: 5.2,
    label: '5.2',
},{
    value: 5.1,
    label: '5.1',
}, {
    value: 5,
    label: '5',
}, {
    value: 4,
    label: '4',
}]
const nj_version = [{
    value: 5,
    label: '5',
}]

const pic_quality = [
    {
        label: '一般',
        value: 1
    },
    {
        label: '清晰',
        value: 2
    },
    {
        label: '高清',
        value: 3
    },
    {
        label: '超高清',
        value: 4
    },
]

const niji_style_v = [
    {
        label: '默认',
        value: 1
    },
    {
        label: '可爱',
        value: 2
    },
    {
        label: '丰富',
        value: 3
    },
    {
        label: '风景',
        value: 4
    },
]
const bili = [
    {
        name: '1:1',
        value: 1,
        width: 100,
        height: 100
    },
    {
        name: '4:3',
        value: 2,
        width: 100,
        height: 75
    },
    {
        name: '3:4',
        value: 3,
        width: 75,
        height: 100
    },
    {
        name: '16:9',
        value: 4,
        width: 100,
        height: 57
    },
    {
        name: '9:16',
        value: 5,
        width: 57,
        height: 100
    },

]
const change_prompt = () => {
    // 数组中all_prompt随机拿数据改变prompt_info并且判断不和上一次一样
    let random = Math.floor(Math.random() * all_prompt.length)
    if (input2.value == all_prompt[random]) {
        change_prompt()
    } else {
        input2.value = all_prompt[random]
    }
}
const change_size = (s_v: string) => {
    size.value = s_v
}
const change_i = (i_v: number) => {
    image_select.value = i_v
}
const r_images = ref([])
const draw_loading = ref(false)
const is_sc = ref(false)
const is_finish = ref(false)
const activeName = ref('first')
const me_draw = ref([])
const public_draw = ref([])


const change_draw = (v: string) => {
    activeDraw.value = v
}
const ai_draw = () => {
    if (input2.value == '') {
        Message.error('请填写关键词')
        return false;
    }
    is_sc.value = true
    draw_loading.value = true
    ai_draw_openai({
        prompt: input2.value,
        size: size.value,
        number: image_select.value,
    }).then((res: any) => {
        r_images.value = res._rawValue.data
        is_finish.value = false
        is_sc.value = false
        Message.success('生成成功')
        get_me_d()
        draw_loading.value = false
    }).catch((err: any) => {
        Message.error('生成失败')
        is_sc.value = false
        is_finish.value = false
        draw_loading.value = false
    })
}
const ai_draw_pay = ref('0')
const me_draw_count = ref(0)
const public_draw_count = ref(0)
const me_page = ref(1)
const public_page = ref(1)
const me_page_size = ref(16)
const public_page_size = ref(16)
const ske_loading = ref(false)
const token = useCookie('token')
if (token.value) {
    get_user_balance()
}
const check_time = ref(false)
const time_set = ref()
const get_me_d = () => {
    clearInterval(time_set.value)
    srcList.value = []
    get_me_draw({
        page: me_page.value,
        limit: me_page_size.value,
    }).then((res: any) => {
        me_draw.value = res._rawValue.data
        me_draw_count.value = res._rawValue.count
        ai_draw_pay.value = res._rawValue.dw_m
        mj_midj.value = res._rawValue.mj_m
        for (let i = 0; i < me_draw.value.length; i++) {
            if (me_draw.value[i].progress != 100 && me_draw.value[i].type == 'midjourney'){
                check_time.value = true;
                break;
            } else {
                check_time.value = false;
            }
        }

        if (check_time.value) {
            time_set.value = setTimeout(() => {
                get_me_d();
            }, 3000);
        }
        for (let i = 0; i < me_draw.value.length; i++) {
            srcList.value.push(me_draw.value[i].image)
        }
    }).catch((err: any) => {
        console.log(err)
    })
}
if (token.value) {
    get_me_d()
}
const load_more_loading = ref(false)
const get_new_public = () => {
    pub_srcList.value = []
    load_more_loading.value = true
    get_public_draw({
        page: public_page.value,
        limit: public_page_size.value,
    }).then((res: any) => {
        public_draw.value = res._rawValue.data
        public_draw_count.value = res._rawValue.count
        load_more_loading.value = false
    }).catch((err: any) => {
        console.log(err)
        load_more_loading.value = false
    })
    for (let i = 0; i < public_draw.value.length; i++) {
        pub_srcList.value.push(public_draw.value[i].image)
    }

}
get_new_public()
const visible1  = ref(false)
const onDownLoad = (imgsrc:any)=>{
    // 下载当前图片
    const image = new Image()
    image.src = imgsrc
    image.onload = function () {
        const a = document.createElement('a')
        a.href = imgsrc
        a.download = '图片'
        a.click()
    }
}
const send_pub = (c: number, mid: number) => {
    send_public({
        draw_id: mid
    }).then((res: any) => {
        Message.success(res._rawValue.message)
        get_me_d()
        get_new_public()
    }).catch((err: any) => {
        console.log(err)
    })
}
const change_activeN = (v: string) => {
    activeName.value = v
    get_new_public()
}

const get_info = (name: string) => {
    if (input2.value == '') {
        input2.value = name
    } else {
        input2.value = input2.value + '，' + name
    }
}
const {public: {baseUrl}} = useRuntimeConfig()
const headers = {
    'Authorization': `Bearer ${token.value}`,
    'Accept': 'text/event-stream',
}
const streams = ref()
const last_content = ref('')
const draw_ai = ref('')
const send_ai_draw = async () => {
    if (draw_ai.value == '') {
        Message.error('请输入内容')
        return false
    }
    input2.value = ''
    last_content.value = ''
    draw_loading.value = true
    const res = await fetch(`${baseUrl}api/draw_ai_send`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            content: draw_ai.value,
            type: 'draw_ai',
        }),

    })

    if (res.status == 500) {
        draw_loading.value = false
        Message.error('服务器错误')
        return false
    }
    if (res.status == 401) {
        draw_loading.value = false
        Message.error('请先登录')
        return false
    }
    if (res.status == 402) {
        draw_loading.value = false
        Message.error('发送次数已达上限或余额不足')
        return false
    }
    if (res.status == 403) {
        draw_loading.value = false
        Message.error('禁止发送违禁词')
        return false
    }
    const stream = res.body?.getReader();
    const onData = ({value}: { value: Uint8Array }) => {
        let result = new TextDecoder().decode(value);
        // console.log(result);
        let arr = result.split('\n\n').map(str => str.replace(/\n/g, ''));
        let new_arr: any[] = [];
        // console.log(arr)
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].slice(-2) == ']}' && arr[i].startsWith('data:')) {
                new_arr.push(JSON.parse(arr[i].replace('data:', '')));
            } else if (arr[i].startsWith('data:') && arr[i].slice(-2) != ']}') {
                streams.value = arr[i].replace('data:', '');
            } else if (arr[i].slice(-2) == ']}' && arr[i].startsWith('data:') == false) {
                // 与streams.value拼接成一个字符串
                let str = streams.value += arr[i]
                new_arr.push(JSON.parse(str.replace('data:', '')))
                streams.value = ''
            } else {
                if (arr[i].includes('"error"')) {
                    last_content.value = JSON.parse(arr[i]).error.message
                }
                streams.value = ''
            }

        }


        // console.log(new_arr)
        for (let i = 0; i < new_arr.length; i++) {
            setTimeout(() => {
                if (new_arr[i].choices[0].delta.content) {
                    last_content.value += new_arr[i].choices[0].delta.content
                    input2.value = last_content.value
                }
            }, 100)

        }

    };


    const read = async () => {
        const result = await stream?.read();
        if (result?.done) {
            draw_loading.value = false
            draw_ai.value = ''

        } else {
            onData(result!);
            await read();
        }
    };
    await read();
}
// translate send
const translate = async () => {
    if (input2.value == '') {
        Message.error('请输入内容')
        return false
    }
    last_content.value = ''
    draw_loading.value = true
    const res = await fetch(`${baseUrl}api/draw_ai_translate`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            content: input2.value,
            type: 'draw_fanyi',
        }),

    })

    if (res.status == 500) {
        draw_loading.value = false
        Message.error('服务器错误')
        return false
    }
    if (res.status == 401) {
        draw_loading.value = false
        Message.error('请先登录')
        return false
    }
    if (res.status == 402) {
        draw_loading.value = false
        Message.error('发送次数已达上限或余额不足')
        return false
    }
    if (res.status == 403) {
        draw_loading.value = false
        Message.error('禁止发送违禁词')
        return false
    }
    const stream = res.body?.getReader();
    const onData = ({value}: { value: Uint8Array }) => {
        let result = new TextDecoder().decode(value);
        // console.log(result);
        let arr = result.split('\n\n').map(str => str.replace(/\n/g, ''));
        let new_arr: any[] = [];
        // console.log(arr)
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].slice(-2) == ']}' && arr[i].startsWith('data:')) {
                new_arr.push(JSON.parse(arr[i].replace('data:', '')));
            } else if (arr[i].startsWith('data:') && arr[i].slice(-2) != ']}') {
                streams.value = arr[i].replace('data:', '');
            } else if (arr[i].slice(-2) == ']}' && arr[i].startsWith('data:') == false) {
                // 与streams.value拼接成一个字符串
                let str = streams.value += arr[i]
                new_arr.push(JSON.parse(str.replace('data:', '')))
                streams.value = ''
            } else {
                if (arr[i].includes('"error"')) {
                    last_content.value = JSON.parse(arr[i]).error.message
                }
                streams.value = ''
            }

        }


        // console.log(new_arr)
        for (let i = 0; i < new_arr.length; i++) {
            setTimeout(() => {
                if (new_arr[i].choices[0].delta.content) {
                    last_content.value += new_arr[i].choices[0].delta.content
                    input2.value = last_content.value
                }
            }, 100)

        }

    };


    const read = async () => {
        const result = await stream?.read();
        if (result?.done) {
            draw_loading.value = false
        } else {
            onData(result!);
            await read();
        }
    };
    await read();
}


const value_height = ref(0)
const value_width = ref(0)

const ai_draw_dreams = () => {
    if (input2.value == '') {
        Message.error('请填写关键词')
        return false;
    }
    is_sc.value = true
    draw_loading.value = true
    ai_draw_dream({
        prompt: input2.value,
        size: size.value,
        number: image_select.value,
        height: value_height.value,
        width: value_width.value
    }).then((res: any) => {
        r_images.value = res._rawValue.data
        is_finish.value = true
        is_sc.value = false
        Message.success('生成成功')
        get_me_d()
        draw_loading.value = false
    }).catch((err: any) => {
        Message.error('生成失败')
        is_sc.value = false
        draw_loading.value = false
    })
}
// midj
const midj_ai_draw_send = () => {
    if (input2.value == '') {
        Message.error('请填写关键词')
        return false;
    }
    input2.value = input2.value.replace(/\n/g, '');
    draw_loading.value = true
    if (is_pic.value == false) {
        midj_ai_draw({
            prompt: input2.value,
        }).then((res: any) => {
            midj_ai_draw_check(res._rawValue.prompt_id)
            Message.success('提交成功,请到我的绘画查看')
            draw_loading.value = false

            get_me_d()
        }).catch((err: any) => {
            Message.error('提交失败')
            is_sc.value = false
            draw_loading.value = false
        })
    } else {
        midj_ai_draw({
            prompt: input2.value,
            version: version.value,
            version_ban: version.value == 1 ? version_me.value : version_nj.value,
            mj_row: mj_row.value,
            niji_style: niji_style.value,
            pic_select: pic_select.value,
            chaos: chaos.value,
            style: style.value,
            choose_bili: choose_bili.value,
            imageUrl: imageUrl.value,
        }).then((res: any) => {
            midj_ai_draw_check(res._rawValue.prompt_id)
            Message.success('提交成功,请到我的绘画查看')
            draw_loading.value = false

            get_me_d()
        }).catch((err: any) => {
            Message.error('提交失败')
            is_sc.value = false
            draw_loading.value = false
        })
    }

}
const midj_interval = ref()
const no_img = ref('')


// 轮询midjourney
const midj_ai_draw_check = (midj_ai: any) => {
    // draw_loading.value = true
    // is_finish.value = false
    midj_ai_check({
        prompt_id: midj_ai
    }).then((res: any) => {
        // if (res._rawValue.info == 'finished') {
        //     r_images.value = res._rawValue.data
        //     is_finish.value = true
        //     is_sc.value = false
        //     draw_loading.value = false
        //     Message.success('生成成功')
        //     no_img.value = ''
        //     get_me_d()
        // } else {
        //     no_img.value = res._rawValue.no_img
        //     setTimeout(() => {
        //         midj_ai_draw_check(midj_ai)
        //     }, 3000)
        // }
    }).catch((err: any) => {
        console.log(err)
        Message.error('生成失败')
        is_sc.value = false
        draw_loading.value = false
    })
}
const up_loading = ref(false)


const up_image_midj = (index: number, title: any, prompt_id: any) => {
    up_loading.value = true
    is_sc.value = true
    draw_loading.value = true
    up_midj_index({
        prompt: title,
        index: index,
        prompt_id: prompt_id
    }).then((res: any) => {
        up_loading.value = false
        r_images.value = res._rawValue.data
        is_finish.value = true
        is_sc.value = false
        draw_loading.value = false
        get_me_d()
    }).catch((err: any) => {
        up_loading.value = false
        is_sc.value = false
        draw_loading.value = false
        console.log(err)
    })
}

const vp_image_midj = (index: number, title: any, prompt_id: any) => {
    up_loading.value = true
    is_sc.value = true
    draw_loading.value = true
    v_midj_index({
        prompt: title,
        index: index,
        prompt_id: prompt_id
    }).then((res: any) => {
        up_loading.value = false
        r_images.value = res._rawValue.data
        is_finish.value = true
        is_sc.value = false
        draw_loading.value = false
        get_me_d()
    }).catch((err: any) => {
        up_loading.value = false
        is_sc.value = false
        draw_loading.value = false
        console.log(err)
    })
}

const me_change = (val: number) => {
    me_page.value = val
    get_me_d()
}

const public_change = (val: number) => {
    public_page.value = val
    get_new_public()
}
const load_more = () => {
    public_page_size.value +=16
    get_new_public()
}
const draw_bottom = ref(false)
const del_me_draw = (id: number) => {
    draw_bottom.value = true
    del_me_d({
        draw_id: id
    }).then((res: any) => {
        Message.success(res._rawValue.message)
        draw_bottom.value = false
        get_me_d()
    }).catch((err: any) => {
        draw_bottom.value = false
        console.log(err)
    })
}
</script>
