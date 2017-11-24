#! /bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
. $DIR/var.sh
STACK=$1
TEMP=build/templates/$STACK.json
NAME=$(echo $1 | rev | cut -d'/' -f1 | rev)

name () {
    echo $($DIR/name.sh $STACK $1)
}

up(){ 
    echo $TEMP
    ./bin/check.sh $STACK
    aws --region $REGION --profile $PROFILE     \
        cloudformation create-stack             \
        --stack-name $(name inc)                \
        --capabilities "CAPABILITY_NAMED_IAM"   \
        --disable-rollback                      \
        --template-body file://$TEMP
}

update(){ 
    ./bin/check.sh $STACK
    aws --region $REGION --profile $PROFILE     \
        cloudformation update-stack             \
        --stack-name $(name)                    \
        --capabilities "CAPABILITY_NAMED_IAM"   \
        --template-body file://$TEMP
}

down(){ 
    aws --region $REGION --profile $PROFILE cloudformation delete-stack --stack-name $(name)
}

case $2 in 
    "update")
        update
        ;;
    "up") 
        up
        ;;
    "down")
        down
        ;;
    "restart")
        down && up
        ;;
    *)
        echo "unkown"
        ;;
esac

        

